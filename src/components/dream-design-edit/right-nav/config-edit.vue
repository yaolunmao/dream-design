<template>
    <div>
        <el-button type="primary" plain round :icon="Edit" @click="clickEdit">编辑配置</el-button>
        <el-dialog
            v-model="dialogVisible"
            title="配置编辑"
            width="40%"
            :before-close="cancelEvent"
            :show-close="false"
        >
            <el-form :label-position="labelPosition" label-width="120px">
                <el-form-item
                    v-for="(val, key, i) in props.selectComponentInfo.props[props._Key].config"
                    :label="val.title"
                    :title="val.tips"
                    class="formitem"
                >
                    <el-select
                        v-model="val.default"
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
                        v-model="val.default"
                    />
                    <el-radio-group
                        v-model="val.default"
                        v-else-if="val.type == ERightToolAttrType.Radio"
                    >
                        <el-radio :label="item.value" v-for="item in val.options">{{ item.label }}</el-radio>
                    </el-radio-group>
                    <el-input
                        v-model="val.default"
                        v-else-if="val.type == ERightToolAttrType.Input"
                    ></el-input>
                    <el-input-number
                        v-model="val.default"
                        v-else-if="val.type == ERightToolAttrType.InputNumber"
                    ></el-input-number>
                </el-form-item>
            </el-form>

            <template #footer>
                <span>
                    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElSelect, ElOption, ElDialog, ElButton, ElSwitch, ElRadioGroup, ElRadio, ElInput, ElInputNumber } from "element-plus";
import { PropType, ref, watch, watchEffect } from "vue";
import { ERightToolAttrType, IConfigComponentItemProps, IDoneComponent } from '../../../model/model';
import { Edit } from '@element-plus/icons-vue'
const labelPosition = ref('left');
const dialogVisible = ref(false);
const props = defineProps({
    selectComponentInfo: {
        type: Object as PropType<IDoneComponent>,
        default: {}
    },
    _Key: {
        type: String,
        default: ''
    }
});
watchEffect(() => {
    let init_props = {};
    for (let key in props.selectComponentInfo.props[props._Key].config) {
        init_props = {
            ...init_props,
            ...{ [key]: (props.selectComponentInfo.props[props._Key].config as IConfigComponentItemProps)[key].default },
        };
    }
    props.selectComponentInfo.props[props._Key].default = init_props;
})
const clickEdit = () => {
    dialogVisible.value = true;
}
const cancelEvent = () => {
    dialogVisible.value = false;
}
</script>
<style scoped lang="less">
@import "../../../assets/global.module";
.formitem{
    margin: 8px 30px;
}
</style>