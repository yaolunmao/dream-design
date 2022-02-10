<template>
    <div class="flex-h">
        <div>
            <div class="tip-title">组件预览区</div>
            <div class="flex-v flex-center priview">
                <div style="width: 100%;height: auto;">
                    <render-component
                        :leftDragDomInfo="props.selectComponentInfo"
                        :previewMode="true"
                    ></render-component>
                </div>
            </div>
        </div>
        <el-divider direction="vertical" class="divider-h"></el-divider>
        <div>
            <div class="tip-title">TypeScript函数编写区(请将代码写到{ }中)</div>
            <monaco-edit
                :code="ts_code"
                :language="IMonacoLanguage.TypeScript"
                @onDidChangeModelContent="onDidChangeModelContent"
                class="monaco-edit"
                ref="monacoEditRef"
            ></monaco-edit>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onUnmounted, PropType, ref } from 'vue';
import { IDoneComponent, IMonacoLanguage } from '../../../model/model';
import { cssToJson, objectToCss, randomString } from '../../../utils';
import MonacoEdit from '../../monaco-edit/index.vue';
import RenderComponent from '../render-component/index.vue';
import { ElDivider } from "element-plus";
const props = defineProps({
    selectComponentInfo: {
        type: Object as PropType<IDoneComponent>,
        default: {}
    },
    eventKey: {
        type: String,
        default: ''
    },
    eventAnonymousParams: {
        type: Array as PropType<String[]>,
        default: []
    }
});
const monacoEditRef = ref<InstanceType<typeof MonacoEdit>>();
const ts_code = ref(``);
//记录之前的函数
let old_func = "";
if (!props.selectComponentInfo.eventAttr) {
    old_func = "";
}
else {
    old_func = props.selectComponentInfo.eventAttr[props.eventKey].val;
}
const tempFuncName = `const ${props.selectComponentInfo.id.replaceAll('-', '')}${props.eventKey}=(${props.eventAnonymousParams.toString()})=>{`;
ts_code.value = old_func ? `${tempFuncName}\n\t${old_func}\n}` : `${tempFuncName}\n\t\n}`;

const onDidChangeModelContent = (code: string) => {
    const temp_code = code.substring(0, code.length - 1).replace(tempFuncName, '');
    if (props.selectComponentInfo.eventAttr) {
        props.selectComponentInfo.eventAttr[props.eventKey].val = temp_code;
    }
}
const cancelEvent = () => {
    if (props.selectComponentInfo.eventAttr) {
        props.selectComponentInfo.eventAttr[props.eventKey].val = old_func;
    }
    disposeMonacoEdit();
}
const disposeMonacoEdit = () => {
    //释放编辑器是为了绕过变量重复定义的错误
    (monacoEditRef.value as any).disposeEdit();//不断言打包报错 暂时未找到解决办法
    

};
defineExpose({
    cancelEvent, disposeMonacoEdit
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