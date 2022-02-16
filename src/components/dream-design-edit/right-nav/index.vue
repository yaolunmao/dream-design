<template>
    <el-scrollbar>
        <!-- <el-button type="primary" :auto-insert-space="true">好几个中文</el-button> -->
        <el-empty description="请先选中组件" v-if="!select_component_info.id"></el-empty>
        <el-collapse v-model="activeNames" @change="handleChange" v-else>
            <el-collapse-item name="1">
                <template #title>
                    <div style="font-weight: bolder;font-style: italic;">基本属性</div>
                </template>
                <el-form :label-position="labelPosition" label-width="90px" size="small">
                    <el-form-item label="标题">
                        <el-input v-model="select_component_info.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文本" v-if="select_component_info?.tagSlots?.enable">
                        <el-input v-model="select_component_info.tagSlots.val"></el-input>
                    </el-form-item>
                    <ext-props :select-component-info="select_component_info"></ext-props>
                    <el-form-item
                        v-for="(val, key, i) in select_component_attr?.props"
                        :label="val.title"
                        :title="val.tips"
                        class="item"
                    >
                        <el-select
                            v-model="select_component_info.props[key].default"
                            placeholder="Select"
                            v-if="val.type == ERightToolAttrType.Select"
                        >
                            <el-option
                                v-for="item in val.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-switch
                            v-else-if="val.type == ERightToolAttrType.Switch"
                            v-model="select_component_info.props[key].default"
                        />
                        <el-color-picker
                            v-else-if="val.type == ERightToolAttrType.ColorPicker"
                            v-model="select_component_info.props[key].default"
                        />
                        <el-radio-group
                            v-model="select_component_info.props[key].default"
                            v-else-if="val.type == ERightToolAttrType.Radio"
                        >
                            <el-radio
                                :label="item.value"
                                v-for="item in val.options"
                            >{{ item.label }}</el-radio>
                        </el-radio-group>
                        <el-input
                            v-model="select_component_info.props[key].default"
                            v-else-if="val.type == ERightToolAttrType.Input"
                        ></el-input>
                        <el-input-number
                            v-model="select_component_info.props[key].default"
                            v-else-if="val.type == ERightToolAttrType.InputNumber"
                        ></el-input-number>
                        <json-code-edit
                            :select-component-info="select_component_info"
                            :event-key="(key as string)"
                            v-else-if="val.type == ERightToolAttrType.JsonEdit"
                        ></json-code-edit>
                        <config-edit
                            :select-component-info="select_component_info"
                            :select_component_attr="select_component_attr"
                            :_-key="(key as string)"
                            v-else-if="val.type == ERightToolAttrType.ConfigEdit"
                        ></config-edit>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template #title>
                    <div style="font-weight: bolder;font-style: italic;">样式设置</div>
                </template>
                <el-form :label-position="labelPosition" label-width="90px" size="small">
                    <el-form-item label="选择预制样式">
                        <el-select v-model="global_css_checked" multiple placeholder="请选择预制样式">
                            <el-option
                                v-for="item in global_css_default"
                                :title="item.tips"
                                :key="item.class_name"
                                :label="item.label"
                                :value="item.class_name"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="自定义样式">
                        <el-button
                            type="primary"
                            plain
                            round
                            :icon="Edit"
                            @click="customCssDialogVisible = true"
                        >编写自定义样式</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template #title>
                    <div style="font-weight: bolder;font-style: italic;">事件设置</div>
                </template>
                <el-form :label-position="labelPosition" label-width="90px" size="small">
                    <el-form-item
                        v-show="select_component_info.eventAttr"
                        v-for="(val, key, i) in select_component_info.eventAttr"
                        :label="val.tips"
                    >
                        <el-checkbox v-model="val.custom" label="自定义函数" size="small"></el-checkbox>

                        <el-select
                            v-if="!val.custom"
                            v-model="global_event_checked[i]"
                            multiple
                            placeholder="请选择调用函数"
                        >
                            <el-option
                                v-for="item in global_event_default"
                                :title="item.tips"
                                :key="item.event_name"
                                :label="item.label"
                                :value="item.event_name"
                            ></el-option>
                        </el-select>
                        <el-button
                            v-else
                            type="primary"
                            plain
                            round
                            :icon="Edit"
                            @click="editCustomEvent(key as string, val.anonymous_params)"
                        >编写自定义函数</el-button>
                    </el-form-item>
                    <el-empty v-show="!select_component_info.eventAttr" description="该组件未设置任何事件"></el-empty>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template #title>
                    <div style="font-weight: bolder;font-style: italic;">特殊属性</div>
                </template>
                <el-form :label-position="labelPosition" label-width="90px" size="small">
                    <!-- 如遇组件无法移动请开启兼容性开关，开启兼容性会修改dom导致组件样式发生变化，关闭兼容性开关可能会导致某些组件无法选中，需要从dom树选中组件 -->
                    <el-form-item label="兼容性" title="关闭兼容性将与生成编程一致的dom树">
                        <el-switch v-model="select_component_info.compatibility"></el-switch>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-dialog
            v-model="customCssDialogVisible"
            title="编写选中组件自定义样式"
            width="80%"
            destroy-on-close
            modal
            :before-close="customCssHandleClose"
            :show-close="false"
        >
            <custom-class ref="customCssRef" :select-component-info="select_component_info"></custom-class>
            <template #footer>
                <span>
                    <el-button @click="customCssDialogVisible = false">确定</el-button>
                    <el-button @click="customCssHandleClose">取消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            v-model="customFuncDialogVisible"
            title="编写选中组件自定义函数"
            width="80%"
            destroy-on-close
            modal
            :before-close="customFuncHandleCancel"
            :show-close="false"
        >
            <custom-func
                v-if="customFuncDialogVisible"
                ref="customFuncRef"
                :select-component-info="select_component_info"
                :event-anonymous-params="event_anonymous_params"
                :event-key="event_key"
            ></custom-func>
            <template #footer>
                <span>
                    <el-button @click="customFuncHandleDefine">确定</el-button>
                    <el-button @click="customFuncHandleCancel">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect, inject, Ref, PropType } from 'vue'
// import { useStore } from 'vuex';
// import { IStoreDoneComponent } from '../../store/model';


import { ERightToolAttrType, IConfigComponentItemInfo, IDoneComponent, IEventAttr, IGloablCss, IGloablEvent } from '../../../model/model';
import { Edit } from '@element-plus/icons-vue'
import { ElSwitch, ElCheckbox, ElDialog, ElButton, ElScrollbar, ElEmpty, ElCollapseItem, ElCollapse, ElForm, ElInput, ElRadio, ElSelect, ElRadioGroup, ElFormItem, ElOption, ElInputNumber, ElColorPicker } from "element-plus";
import ExtProps from './ext-props.vue';
import CustomClass from './custom-class.vue';
import MonacoEdit from '../../monaco-edit/index.vue';
import { objectDeepClone } from '../../../utils';
import CustomFunc from './custom-func.vue';
import JsonCodeEdit from './json-code-edit.vue';
import ConfigEdit from './config-edit.vue';
const select_component_info = inject('select_component_info') as Ref<IDoneComponent>;
const global_css_default = inject<IGloablCss[]>('global_css_default');
const global_event_default = inject<IGloablEvent[]>('global_event_default');
const props = defineProps({
    globalConfig: {
        type: Array as PropType<IConfigComponentItemInfo[]>,
        default: []
    }
});
//选中的css
const global_css_checked = computed({
    get: () => select_component_info.value.classAttr?.global ?? [],
    set: val => {
        if (select_component_info.value.classAttr == undefined) {
            select_component_info.value['classAttr'] = {
                global: []
            };
        }
        select_component_info.value.classAttr.global.length = 0;
        //这里是赋值而不是push是因为select_component_info.value.classAttr是ref
        select_component_info.value.classAttr.global = val;
    }
});
const global_event_checked = reactive<string[][]>([[]]);
//选中的调用函数列表
const labelPosition = ref('left')
const activeNames = ref(['1']);
//自定义css
const customCssDialogVisible = ref(false);
const customCssRef = ref<InstanceType<typeof CustomClass>>();
const customCssHandleClose = () => {
    (customCssRef.value as any).cancelEvent();
    customCssDialogVisible.value = false
}
//自定义函数
const customFuncDialogVisible = ref(false);
const customFuncRef = ref<InstanceType<typeof CustomFunc>>();
const customFuncHandleCancel = () => {
    (customFuncRef.value as any).cancelEvent();
    customFuncDialogVisible.value = false
}
const customFuncHandleDefine = () => {
    (customFuncRef.value as any).disposeMonacoEdit();
    customFuncDialogVisible.value = false
}
const event_key = ref('');
const event_anonymous_params = ref<string[]>([]);
const editCustomEvent = (key: string, anonymous_params: string[]) => {
    customFuncDialogVisible.value = true;
    event_key.value = key;
    event_anonymous_params.value = anonymous_params;
}
const select_component_attr = computed(() =>
    props.globalConfig.find(f => f.tag == select_component_info.value.tag)
);
watch(global_event_checked, () => {
    //改变当前已选中的全局函数
    for (let i = 0; i < global_event_checked.length; i++) {
        const temp_eventAttr = select_component_info.value.eventAttr;
        if (temp_eventAttr) {
            let event_keys = Object.keys(temp_eventAttr);
            temp_eventAttr[event_keys[i]].list = global_event_checked[i];
        }
    }
});
// const global_css_option = ref<IGloablCss[]>([]);
// watch(global_css_checked, () => {
//     if (select_component_info.value.classAttr == undefined) {
//         select_component_info.value['classAttr'] = {
//             global: []
//         };
//     }
//     select_component_info.value.classAttr.global.length = 0;
//     //这里是赋值而不是push是因为select_component_info.value.classAttr是ref
//     select_component_info.value.classAttr.global = global_css_checked.value;
// });
// watch(select_component_info, () => {
// });
watch(select_component_info, () => {
    global_event_checked.length = 0;
    for (let item in select_component_info.value.eventAttr) {
        if (!select_component_info.value.eventAttr[item].custom) {
            global_event_checked.push(objectDeepClone(select_component_info.value.eventAttr[item].list, []));
        }
        else {
            global_event_checked.push([]);
        }

    }
});
//if (select_component_info.value.eventAttr) {
// global_css_checked.value =objectDeepClone(select_component_info.value.classAttr?.global,[]);
// global_event_checked.value =objectDeepClone(select_component_info.value.eventAttr);


// });
// watchEffect(() => {
//     if (global_css_default != undefined) {
//         global_css_option.value = global_css_default.value;
//     }
// })
// const form_props = reactive({ data: {} });
const handleChange = (val: string[]) => {
    // console.log(val)
}

// const store = useStore();


// watch(form_props, () => {
//     //去修改子组件监听那个变量
//     store.dispatch('theModifiedSelectedComponentInfo', { ...form_props.data });
// });
// watchEffect(() => {
//     form_props.data = { ...store.getters.selectedComponentInfo };
// })
// const form_props11 = computed({
//     get: () => store.getters.theModifiedSelectedComponentInfo,
//     set: val => {
//         console.log(val);
//     }
// })
// const formLabelAlign = reactive({
//     name: '',
//     region: '',
//     type: '',
// })
</script>
<style scoped lang="less">
.item:hover {
    cursor: help;
}
</style>