<template>
    <div class="flex-h flex-between" style="width: 100%;">
        <div class="flex-h flex-v-center" style="width: 220px;">
            <img title="Dream design" class="logoimg" src="../../../assets/logo.png" />
            <el-icon
                size="22"
                @click="() => emit('changeLeftBarFoldStatus')"
                style="cursor: pointer;"
            >
                <Fold v-if="props.leftBarFoldStatus"></Fold>
                <Expand v-else></Expand>
            </el-icon>
        </div>
        <div
            class="flex-h flex-v-center"
            style="width: calc(100% - 440px);flex-direction: row-reverse;margin-right: 20px;"
        >
            <div style="margin-left: 10px;">
                <el-button type="text" title="预览" @click="() => emit('topPreviewBtnClick')">
                    <el-icon :size="20">
                        <View />
                    </el-icon>
                    <div style="margin-left: 5px;">预览</div>
                </el-button>
            </div>
            <div style="margin-left: 10px;">
                <el-button type="text" title="页面变量" @click="() => emit('topParamBtnClick')">
                    <el-icon :size="20">
                        <svg-icon name="params"></svg-icon>
                    </el-icon>
                    <div style="margin-left: 5px;">页面变量</div>
                </el-button>
            </div>
        </div>
        <div class="flex-h flex-v-center" style="width: 220px;">
            <el-icon
                size="22"
                @click="() => emit('changeRightBarFoldStatus')"
                style="cursor: pointer;"
            >
                <Expand v-if="props.rightBarFoldStatus"></Expand>
                <Fold v-else></Fold>
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Edit, Fold, Expand, View, Check, Message, Star, Delete } from '@element-plus/icons-vue';
import { ElIcon, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElRow } from 'element-plus';
import SvgIcon from "../../svg-icon/index.vue";
const props = defineProps({
    leftBarFoldStatus: {
        type: Boolean,
        default: true
    },
    rightBarFoldStatus: {
        type: Boolean,
        default: true
    }
});
const emit = defineEmits(['changeLeftBarFoldStatus', 'changeRightBarFoldStatus','topPreviewBtnClick','topParamBtnClick']);

</script>
<style scoped lang="less">
@import "../../../assets/global.module";
.logoimg {
    height: 55px;
    width: 60px;
}
</style>