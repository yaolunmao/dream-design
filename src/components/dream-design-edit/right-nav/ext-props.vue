<script setup lang="ts">
import { computed, PropType, ref, watchEffect } from 'vue';
import { IDomExtProps, IDoneComponent } from '../../../model/model';
import { ElFormItem, ElInputNumber, ElMessageBox } from "element-plus";
import { objectDeepClone, randomString } from '../../../utils';
//接收传过来的类型
const props = defineProps({
    selectComponentInfo: {
        type: Object as PropType<IDoneComponent>,
        default: {}
    },
    enableDeleteTip: {
        type: Boolean,
        default: true
    }
});
const children_length_ref=ref(0);
watchEffect(()=>{
    children_length_ref.value=props.selectComponentInfo.childrens.length
})
const handleChange = (value: number) => {
    if (value > props.selectComponentInfo.childrens.length) {
        props.selectComponentInfo.childrens.push(objectDeepClone({ ...props.selectComponentInfo.childrens[0], id: props.selectComponentInfo.childrens[0].tag + '-' + randomString(), childrens: [] }));
    }
    else {
        const last_children = props.selectComponentInfo.childrens[props.selectComponentInfo.childrens.length - 1];
        if (props.enableDeleteTip && last_children.childrens.length > 0) {
            ElMessageBox.confirm(
                '删除子容器将导致容器内内容全部清空 是否继续?',
                '警告',
                {
                    confirmButtonText: '继续',
                    cancelButtonText: '算了',
                    type: 'warning',
                }
            )
                .then(() => {
                    props.selectComponentInfo.childrens.pop();
                })
                .catch(() => {
                    children_length_ref.value = value + 1;
                })
        }
        else {
            props.selectComponentInfo.childrens.pop();
        }
    }
}
</script>
<template>
    <el-form-item :label="(key as string)" v-for="(val, key, i) in selectComponentInfo.extProps">
        <el-input-number
            v-model="children_length_ref"
            v-if="val == IDomExtProps.ChangeChildrenCount"
            title="修改子元素的个数,最小为1"
            :min="1"
            @change="handleChange"
        ></el-input-number>
    </el-form-item>
</template>
