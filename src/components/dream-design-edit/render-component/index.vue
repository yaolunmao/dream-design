<!-- 将json渲染为页面 -->
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, isReactive, PropType, reactive, Ref, ref, watch, watchEffect } from 'vue';
import { ElCascader } from "element-plus";
import { ElRow } from "element-plus";
import draggable from 'vuedraggable/src/vuedraggable';
// import { useStore } from 'vuex';
import { ERightToolAttrType, IConfigComponentItemProps, IDoneComponent, IGloablCss, IGloablEvent } from '../../../model/model';
import { ElButton, ElButtonGroup } from "element-plus";
import { Delete, CopyDocument } from '@element-plus/icons-vue';
//引入echart饼图和柱状图 优点是可以通过修改option就变化图表，非常灵活，缺点是数据量过大，图表变的不易控制
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from "echarts/components";
use([
    CanvasRenderer,
    PieChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
]);
// import { IStoreDoneComponent } from '../../store/model';
const global_css_default = inject<Ref<IGloablCss[]>>('global_css_default');
const global_event_default = inject<Ref<IGloablEvent[]>>('global_event_default');
const props = defineProps({
    leftDragDomInfo: {
        type: Object as PropType<IDoneComponent>,
        default: {}
    },
    //是否为预览模式
    previewMode: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['contextmenuEvent']);
const select_component_info = inject<IDoneComponent>('select_component_info');
const changeSelectedComponentInfo = inject<(select_component: IDoneComponent) => void>('changeSelectedComponentInfo');
// const deleteSelectCompont = inject<(evt: MouseEvent) => any>('deleteSelectCompont');
// const copySelectCompont = inject<(evt: MouseEvent) => any>('copySelectCompont');
// const store = useStore();
const selectedComponentEvent = (select_component: IDoneComponent) => {
    if (props.previewMode) {
        return;
    }
    // store.dispatch('changeSelectedComponentInfo', { ...select_component });
    if (changeSelectedComponentInfo != undefined) {
        changeSelectedComponentInfo(select_component);
    }
};
const contextmenuEvent = (select_component: IDoneComponent, e: MouseEvent) => {
    if (props.previewMode) {
        return;
    }
    if (changeSelectedComponentInfo != undefined) {
        changeSelectedComponentInfo(select_component);
        emit('contextmenuEvent', e);
    }
}
const dynamicEvent = (params: string[], event_str: string) => {
    try {
        if (params?.length > 0) {
            return new Function(params.toString(), event_str);
        }
        else {
            return new Function(event_str);
        }

    } catch (error) {
        console.log(error);
    }

}
const css_style = ref<object[]>([]);
const event_attr = ref<object>({});
// watch(()=>store.getters.theModifiedSelectedComponentInfo, (new_val:IStoreDoneComponent) => {

// });
//跟据组件设置 生成v-bind对象
const component_item_props: IConfigComponentItemProps = reactive({});
watchEffect(() => {
    //取出所有的key
    const any_key = Object.keys(props.leftDragDomInfo.props);
    any_key.forEach(f => {
        component_item_props[f] = props.leftDragDomInfo.props[f].default;
    });
    //处理全局css和自定义css
    const temp_css: object[] = [];
    const temp_css_global_classnames = props.leftDragDomInfo.classAttr?.global;
    const temp_css_custom_classnames = props.leftDragDomInfo.classAttr?.custom;
    //根据所有css名称取出真实样式
    if (temp_css_global_classnames && global_css_default) {
        const temp_css_global_styles = global_css_default?.value?.filter(f => temp_css_global_classnames.includes(f.class_name))?.map(m => m.value);
        temp_css.push(temp_css_global_styles);

    }
    if (temp_css_custom_classnames) {
        temp_css.push(temp_css_custom_classnames);
    }
    css_style.value = temp_css;
    // 处理组件事件

    // for (let _key in props.leftDragDomInfo.customEventAttr) {
    //     event_attr.value = { ...event_attr.value, ...{ [_key]: dynamicEvent(props.leftDragDomInfo.customEventAttr[_key]) } }
    // }
    event_attr.value = {};
    if (props.previewMode) {
        for (let _key in props.leftDragDomInfo.eventAttr) {
            const this_event_attr = props.leftDragDomInfo.eventAttr;
            if (!this_event_attr[_key].custom) {
                //取出全局定义函数
                const global_event_value = global_event_default?.value.filter(f => this_event_attr[_key].list.includes(f.event_name)).map(m => m.value);
                const code_str = global_event_value?.join(';');
                if (code_str) {
                    event_attr.value = {
                        ...event_attr.value, ...{
                            [_key]: dynamicEvent(this_event_attr[_key].anonymous_params, code_str)
                        }
                    };
                }
            }
            else {
                //取出自定义函数
                event_attr.value = {
                    ...event_attr.value, ...{
                        [_key]: dynamicEvent(this_event_attr[_key].anonymous_params, this_event_attr[_key].val)
                    }
                };
            }
        }
    }
});
</script>
<template>
    <component
        :is="props.leftDragDomInfo.tag"
        v-model="props.leftDragDomInfo.v_model"
        v-on="event_attr"
        v-if="props.leftDragDomInfo.compatibility && props.leftDragDomInfo.slots"
        v-bind="component_item_props"
        class="canvas-component"
        :class="`${!props.previewMode ? 'container' : ''} ${props.leftDragDomInfo.canMove && !props.previewMode ? 'can-move' : 'not-move'} ${select_component_info?.id == props.leftDragDomInfo.id && !props.previewMode ? 'select-component' : ''}`"
        @click.stop="selectedComponentEvent(props.leftDragDomInfo)"
        @contextmenu.stop="contextmenuEvent(props.leftDragDomInfo,$event)"
        :style="css_style"
    >
        <draggable
            v-model="props.leftDragDomInfo.childrens"
            class="compatibility"
            :class="`${props.leftDragDomInfo.childrens.length > 0 || props.previewMode ? '' : 'default-slot'} ${props.leftDragDomInfo.ClearStyle ? 'no-dom' : ''}`"
            :group="props.leftDragDomInfo.canAllowTo ? 'design-group' : `${props.leftDragDomInfo.id}-no-group`"
            item-key="id"
            handle=".can-move"
            ghost-class="ghost"
        >
            <template #item="{ element }">
                <index :leftDragDomInfo="element" :preview-mode="props.previewMode" @contextmenuEvent="(e:MouseEvent) => emit('contextmenuEvent',e)"></index>
            </template>
        </draggable>
        {{ props.leftDragDomInfo.tagSlots.enable ? props.leftDragDomInfo.tagSlots.val : null }}
    </component>
    <draggable
        v-on="event_attr"
        :list="props.leftDragDomInfo.childrens"
        :component-data="component_item_props"
        class="canvas-component"
        @click.stop="selectedComponentEvent(props.leftDragDomInfo)"
        @contextmenu.stop="contextmenuEvent(props.leftDragDomInfo,$event)"
        v-else-if="!props.leftDragDomInfo.compatibility && props.leftDragDomInfo.slots"
        :class="`${props.leftDragDomInfo.childrens.length > 0 && !props.previewMode ? '' : 'default-slot'} ${!props.previewMode ? 'container' : ''} ${props.leftDragDomInfo.canMove && !props.previewMode ? 'can-move' : 'not-move'} ${select_component_info?.id == props.leftDragDomInfo.id && !props.previewMode ? 'select-component' : ''}`"
        :group="props.leftDragDomInfo.canAllowTo ? 'design-group' : props.leftDragDomInfo.id"
        item-key="id"
        ghost-class="ghost"
        :tag="props.leftDragDomInfo.tag"
        :style="css_style"
    >
        <template #item="{ element }">
            <index :leftDragDomInfo="element" :preview-mode="props.previewMode" @contextmenuEvent="(e:MouseEvent) => emit('contextmenuEvent',e)"></index>
        </template>
    </draggable>
    <div
        v-else-if="props.leftDragDomInfo.compatibility && !props.leftDragDomInfo.slots && props.leftDragDomInfo.tagSlots.enable"
        @click.stop="selectedComponentEvent(props.leftDragDomInfo)"
        @contextmenu.stop="contextmenuEvent(props.leftDragDomInfo,$event)"
        class="compatibility"
        :class="`${props.leftDragDomInfo.canMove && !props.previewMode ? 'can-move' : 'not-move'} ${select_component_info?.id == props.leftDragDomInfo.id && !props.previewMode ? 'select-component' : ''}`"
    >
        <component
            class="canvas-component"
            v-model="props.leftDragDomInfo.v_model"
            v-bind="component_item_props"
            v-on="event_attr"
            :is="props.leftDragDomInfo.tag"
            :style="css_style"
        >{{ props.leftDragDomInfo.tagSlots.val }}</component>
    </div>
    <div
        v-else-if="props.leftDragDomInfo.compatibility && !props.leftDragDomInfo.slots && !props.leftDragDomInfo.tagSlots.enable"
        class="compatibility"
        :class="`${props.leftDragDomInfo.canMove && !props.previewMode ? 'can-move' : 'not-move'} ${select_component_info?.id == props.leftDragDomInfo.id && !props.previewMode ? 'select-component' : ''}`"
        @click.stop="selectedComponentEvent(props.leftDragDomInfo)"
        @contextmenu.stop="contextmenuEvent(props.leftDragDomInfo,$event)"
    >
        <component
            class="canvas-component"
            v-model="props.leftDragDomInfo.v_model"
            v-bind="component_item_props"
            v-on="event_attr"
            :is="props.leftDragDomInfo.tag"
            :style="css_style"
        ></component>
    </div>
    <component
        v-else-if="!props.leftDragDomInfo.slots && props.leftDragDomInfo.tagSlots.enable"
        class="canvas-component"
        :class="`${props.leftDragDomInfo.canMove && !props.previewMode ? 'can-move' : 'not-move'} ${select_component_info?.id == props.leftDragDomInfo.id && !props.previewMode ? 'select-component' : ''}`"
        @click.stop="selectedComponentEvent(props.leftDragDomInfo)"
        @contextmenu.stop="contextmenuEvent(props.leftDragDomInfo,$event)"
        v-model="props.leftDragDomInfo.v_model"
        v-bind="component_item_props"
        v-on="event_attr"
        :is="props.leftDragDomInfo.tag"
        :style="css_style"
    >{{ props.leftDragDomInfo.tagSlots.val }}</component>
    <component
        v-else
        class="canvas-component"
        :class="`${props.leftDragDomInfo.canMove && !props.previewMode ? 'can-move' : 'not-move'} ${select_component_info?.id == props.leftDragDomInfo.id && !props.previewMode ? 'select-component' : ''}`"
        @click.stop="selectedComponentEvent(props.leftDragDomInfo)"
        @contextmenu.stop="contextmenuEvent(props.leftDragDomInfo,$event)"
        v-model="props.leftDragDomInfo.v_model"
        v-bind="component_item_props"
        v-on="event_attr"
        :is="props.leftDragDomInfo.tag"
        :style="css_style"
    ></component>
</template>
<style scoped lang="less">
@import "../../../assets/global.module";
.default-slot {
    width: -webkit-fill-available;
}
.fill {
    width: -webkit-fill-available;
}
.default-slot::after {
    content: " ";
    height: 30px;
    display: table;
}
.no-dom {
    display: contents;
}
.container {
    border: 1px dashed #cccccc;
    padding: 5px;
}
.can-move {
    cursor: move !important;
}
.not-move {
    cursor: default;
}
.canvas-component {
    cursor: pointer;
}
.select-component {
    background-color: rgb(219, 238, 255);
}
.compatibility {
    display: inline-block;
}
</style>