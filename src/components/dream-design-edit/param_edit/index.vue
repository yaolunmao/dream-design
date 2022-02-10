<template>
    <div>
        <div class="flex-h" style="width: 100%;flex-direction: row-reverse;margin-bottom: 10px;">
            <el-button type="success" @click="formAddEvent">新增</el-button>
        </div>
        <div>
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column label="变量名称" prop="name" />
                <el-table-column label="变量类型" prop="type" />
                <el-table-column label="值类型" prop="value_type" />
                <el-table-column label="默认值" prop="val">
                    <template #default="scope">
                        <div>{{ scope.row.val }}</div>
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="搜索变量名" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog v-model="dialogVisible" :title="form_tip" width="40%">
            <el-form label-width="120px">
                <el-form-item label="变量名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="变量类型">
                    <el-select v-model="form.type" placeholder="请选择变量类型">
                        <el-option
                            v-for="item in form_type_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="值类型">
                    <el-select v-model="form.value_type" placeholder="请选择值类型">
                        <el-option
                            v-for="item in form_valuetype_options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="默认值">
                    <el-input v-model="form.val"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogClickYes">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, PropType } from 'vue'
import { ElTable, ElTableColumn, ElInput, ElButton, ElForm, ElFormItem, ElDialog, ElSelect, ElOption } from "element-plus";
import { IParamEdit, IParamEditType, IParamEditValueType } from "../../../model/model"
const props = defineProps({
    paramTableData: {
        type: Array as PropType<IParamEdit[]>,
        default: []
    }
});
const search = ref('');
const form_tip = ref("新增变量");
const form_intention = ref(0);//0代表新增1代表编辑
const form_select_index = ref(0);
const filterTableData = computed(() =>
    props.paramTableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index: number, row: IParamEdit) => {
    form_tip.value = "编辑变量";
    form_intention.value = 1;
    form_select_index.value = index;
    form.value = { ...row };
    dialogVisible.value = true;
}
const handleDelete = (index: number, row: IParamEdit) => {
    props.paramTableData.splice(index, 1);
}
const dialogVisible = ref(false)
const formAddEvent = () => {
    form_intention.value = 0;
    form_tip.value = "新增变量";
    form.value = {
        name: '',
        type: IParamEditType.None,
        value_type: IParamEditValueType.String,
        val: ''
    };
    dialogVisible.value = true;
}
const form = ref<IParamEdit>({
    name: '',
    type: IParamEditType.None,
    value_type: IParamEditValueType.String,
    val: ''
});
const form_type_options = [
    {
        value: IParamEditType.None,
        label: 'None',
    },
    {
        value: IParamEditType.Reactive,
        label: 'Reactive',
    },
    {
        value: IParamEditType.Ref,
        label: 'Ref',
    }
];
const form_valuetype_options = [
    {
        value: IParamEditValueType.String,
        label: '字符串',
    },
    {
        value: IParamEditValueType.Object,
        label: '对象',
    },
    {
        value: IParamEditValueType.Number,
        label: '数字',
    },
    {
        value: IParamEditValueType.Boolean,
        label: '布尔',
    },
    {
        value: IParamEditValueType.Array,
        label: '数组',
    }
]
const dialogClickYes = () => {
    if (form_intention.value == 0) {
        props.paramTableData.push(form.value);
    }
    else {
        props.paramTableData[form_select_index.value] = form.value;
    }
    dialogVisible.value = false;

}
</script>
<style lang="less" scoped>
@import "../../../assets/global.module";
</style>