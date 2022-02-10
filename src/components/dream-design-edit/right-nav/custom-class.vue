<template>
    <div class="flex-h">
        <div>
            <div class="tip-title">组件预览区</div>
            <div class="flex-v flex-center priview">
                <div style="width: 100%;height: auto;">
                    <render-component :leftDragDomInfo="props.selectComponentInfo" :previewMode="true"></render-component>
                </div>
            </div>
        </div>
        <el-divider direction="vertical" class="divider-h"></el-divider>
        <div>
            <div class="tip-title">样式编写区(请将代码写到{ }中)</div>
            <monaco-edit
                :code="css_code"
                :language="IMonacoLanguage.CSS"
                @onDidChangeModelContent="onDidChangeModelContent"
                class="monaco-edit"
            ></monaco-edit>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue';
import { IDoneComponent, IMonacoLanguage } from '../../../model/model';
import { cssToJson, objectToCss } from '../../../utils';
import MonacoEdit from '../../monaco-edit/index.vue';
import RenderComponent from '../render-component/index.vue';
import { ElDivider } from "element-plus";
const props = defineProps({
    selectComponentInfo: {
        type: Object as PropType<IDoneComponent>,
        default: {}
    }
});
const css_code = ref(``);
//记录之前的样式
const old_style = props.selectComponentInfo.classAttr?.custom;
if (old_style) {
    const customClassAttrStr = objectToCss(old_style);
    css_code.value = `.${props.selectComponentInfo.id}${customClassAttrStr}`;
}
else {
    css_code.value = `.${props.selectComponentInfo.id}{\n\n}`;
}

const onDidChangeModelContent = (code: string) => {
    const temp_code = code.replace('.' + props.selectComponentInfo.id, '');

    const temp_code_object = JSON.parse(cssToJson(temp_code));


    if (props.selectComponentInfo.classAttr) {
        props.selectComponentInfo.classAttr.custom = temp_code_object;
    }
    else {
        props.selectComponentInfo['classAttr'] = {
            global: [],
            custom: temp_code_object
        }
    }
}
const cancelEvent = () => {
    if (props.selectComponentInfo.classAttr) {
        props.selectComponentInfo['classAttr'] = {
            global: [],
            custom: old_style
        }
    }
}
defineExpose({
    cancelEvent
})
</script>
<style scoped lang="less">
@import "../../../assets/global.module";
@width: 500px;
@height: 400px;
.priview {
    height: @height;
    width: @width;
}
.monaco-edit {
    height: @height;
    width: @width;
}
.divider-h {
    height: @height+50;
    padding: 0px 10px;
}
.tip-title {
    font-size: 15px;
    font-weight: bold;
    font-style: inherit;
    margin-bottom: 10px;
}
</style>