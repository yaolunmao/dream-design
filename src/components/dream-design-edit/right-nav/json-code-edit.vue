<template>
    <div class="flex-h">
        <el-button type="primary" plain round :icon="Edit" @click="clickEdit">点击编辑</el-button>
        <el-dialog
            v-model="dialogVisible"
            title="编写选中组件数据源"
            width="80%"
            destroy-on-close
            modal
            :before-close="cancelEvent"
            :show-close="false"
        >
            <monaco-edit
                :code="ts_code"
                :language="IMonacoLanguage.JSON"
                @onDidChangeModelContent="onDidChangeModelContent"
                class="monaco-edit"
                ref="monacoEditRef"
            ></monaco-edit>
            <template #footer>
                <span>
                    <el-button @click="dialogVisible = false">确定</el-button>
                    <el-button @click="cancelEvent">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { onUnmounted, PropType, ref } from 'vue';
import { IDoneComponent, IMonacoLanguage } from '../../../model/model';
import { cssToJson, objectToCss, randomString } from '../../../utils';
import MonacoEdit from '../../monaco-edit/index.vue';
import RenderComponent from '../render-component/index.vue';
import { ElDialog, ElButton } from "element-plus";
import { Edit } from '@element-plus/icons-vue'
const props = defineProps({
    selectComponentInfo: {
        type: Object as PropType<IDoneComponent>,
        default: {}
    },
    eventKey: {
        type: String,
        default: ''
    }
});
const dialogVisible = ref(false);
const monacoEditRef = ref<InstanceType<typeof MonacoEdit>>();
const ts_code = ref(``);
const old_func = ref(``);
const clickEdit = () => {
    dialogVisible.value = true;
    old_func.value = props.selectComponentInfo.props[props.eventKey].default;

    ts_code.value = JSON.stringify(old_func.value, null, 2);
}

const onDidChangeModelContent = (code: string) => {
    try {
        props.selectComponentInfo.props[props.eventKey].default = JSON.parse(code);
    } catch (error) {

    }


}
const cancelEvent = () => {
    props.selectComponentInfo.props[props.eventKey].default = old_func.value;
    dialogVisible.value = false;
    disposeMonacoEdit();
}
const disposeMonacoEdit = () => {
    //释放编辑器是为了绕过变量重复定义的错误
    (monacoEditRef.value as any).disposeEdit();//不断言打包报错 暂时未找到解决办法
};
</script>
<style scoped lang="less">
@import "../../../assets/global.module";
.monaco-edit {
    height: 400px;
    width: 100%;
}
.tip-title {
    font-size: 15px;
    font-weight: bold;
    font-style: inherit;
    margin-bottom: 10px;
}
</style>