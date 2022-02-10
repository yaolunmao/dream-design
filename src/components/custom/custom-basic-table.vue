<!-- 演示自定义增删改查表格 -->
<template>
    <div>
        <el-form :inline="true" :model="query_form" label-width="70px">
            <el-form-item
                v-for="(val, key) in table_setting?.info"
                :label="val.title"
                v-show="val.query"
            >
                <el-input v-model="query_form[key]" :placeholder="`请输入${val.title}`"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="flex-h" style="width: 100%;flex-direction: row-reverse;margin-bottom: 10px;">
            <el-button type="success" @click="formAddEvent">新增</el-button>
        </div>
        <el-table :data="form_data" style="width: 100%">
            <el-table-column
                v-for="(val, key) in table_setting?.info"
                :prop="(key as string)"
                :label="val.title"
            />
            <el-table-column label="操作">
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
        <el-dialog v-model="dialogVisible" :title="edit_form_tip" width="40%">
            <el-form label-width="120px">
                <el-form-item
                    v-for="(val, key) in edit_form"
                    :label="table_setting?.info[key]?.title"
                >
                    <el-input v-model="edit_form[key]"></el-input>
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
import axios from 'axios';
import { ElForm, ElFormItem, ElInput, ElTable, ElTableColumn, ElButton, ElDialog, ElRow, ElCol, ElNotification, ElMessage } from 'element-plus';
import { PropType, reactive, ref, watchEffect } from 'vue';
const props = defineProps({
    tableQueryUrl: {
        type: String,
        default: ''
    },
    tableAddUrl: {
        type: String,
        default: ''
    },
    tableEditUrl: {
        type: String,
        default: ''
    },
    tableDeleteUrl: {
        type: String,
        default: ''
    }
});
const dialogVisible = ref(false);
const table_setting = ref<ICustomBasicTableSetting>();
const query_form = ref<{ [key: string]: string }>({
});
const edit_form = ref<{ [key: string]: string }>({
});
const edit_form_intention = ref(1);
const edit_form_select_index = ref(0);
const edit_form_tip = ref('');
const form_data = ref<any>([]);
watchEffect(() => {
    axios.get(props.tableQueryUrl).then(res => {
        query_form.value = {};
        const temp_data: ICustomBasicTableSetting = res.data;
        table_setting.value = temp_data;
        form_data.value = temp_data.data;
        for (let key in temp_data.info) {
            query_form.value = { ...query_form.value, ...{ [key]: '' } };
        };
    });
})



const onSubmit = () => {
    let temp_data = table_setting.value?.data;
    for (let key in query_form.value) {
        if (query_form.value[key]) {
            temp_data = temp_data?.filter(f => f[key].includes(query_form.value[key]));
        }
    }
    form_data.value = temp_data;
}
const handleEdit = (index: number, row: any) => {
    console.log(index, row);
    edit_form_intention.value = 1;
    edit_form_select_index.value = index;
    edit_form_tip.value = "编辑表格";
    edit_form.value = {};
    for (let key in row) {
        edit_form.value = {
            ...edit_form.value,
            ...{
                [key]: row[key]
            }
        }
    }
    // edit_form.value = { ...row };
    dialogVisible.value = true;
}
const handleDelete = (index: number, row: any) => {
    console.log(index, row);
    table_setting.value?.data.splice(index, 1);
    ElMessage({
        message: `删除操作,将数据:${JSON.stringify(row)}发送到接口:${props.tableDeleteUrl}`,
        type: 'success',
    });
}
const dialogClickYes = () => {
    if (edit_form_intention.value == 0 || !table_setting.value) {
        table_setting.value?.data.push(edit_form.value);
        ElMessage({
            message: `新增操作,已将数据:${JSON.stringify(edit_form.value)}发送到接口${props.tableAddUrl}`,
            type: 'success',
        });
    }
    else {
        table_setting.value.data[edit_form_select_index.value] = edit_form.value;
        ElMessage({
            message: `修改操作,将数据:${JSON.stringify(edit_form.value)}发送到接口${props.tableEditUrl}`,
            type: 'success',
        });
    }
    dialogVisible.value = false;

}
const formAddEvent = () => {
    edit_form_intention.value = 0;
    edit_form_tip.value = "新增数据";
    edit_form.value = {
        ...query_form.value
    };
    dialogVisible.value = true;
}
interface ICustomBasicTableSetting {
    info: {
        [key: string]: {
            title: string,
            query: boolean
        }
    },
    data: Array<any>
}
</script>
<style lang="less" scoped>
@import "../../assets/global.module";
.elnotification {
    text-align: left !important;
}
</style>