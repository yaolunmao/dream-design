<template>
    <div class="flex-h flex-between" style="width: 100%;">
        <div class="flex-h flex-v-center flex-between" style="width: 220px;">
            <div class="flex-h flex-v-center">
                <img title="Dream design" class="logoimg" src="../../../assets/logo.png" />
                <div class="logo-title">Dream design</div>
            </div>

            <el-icon
                size="22"
                @click="() => emit('changeLeftBarFoldStatus')"
                style="cursor: pointer;"
            >
                <Fold v-if="props.leftBarFoldStatus"></Fold>
                <Expand v-else></Expand>
            </el-icon>
        </div>
        <div class="flex-h flex-between" style="width: calc(100% - 440px)">
            <div class="flex-h flex-v-center">
                <div style="margin-left: 10px;">
                    <el-button-group>
                        <el-button
                            title="pc布局"
                            :type="select_layout_type == 'pc' ? 'primary' : 'default'"
                            @click="changeLayout('pc')"
                        >
                            <el-icon :size="20">
                                <svg-icon name="pc"></svg-icon>
                            </el-icon>
                        </el-button>
                        <el-button
                            title="pad布局"
                            :type="select_layout_type == 'pad' ? 'primary' : 'default'"
                            @click="changeLayout('pad')"
                        >
                            <el-icon :size="20">
                                <svg-icon name="pad"></svg-icon>
                            </el-icon>
                        </el-button>
                        <el-button
                            title="h5布局"
                            :type="select_layout_type == 'h5' ? 'primary' : 'default'"
                            @click="changeLayout('h5')"
                        >
                            <el-icon :size="20">
                                <svg-icon name="h5"></svg-icon>
                            </el-icon>
                        </el-button>
                    </el-button-group>
                </div>
                <el-divider direction="vertical"></el-divider>
                <el-icon title="撤销" :size="20" class="icon-disable">
                    <svg-icon name="undo"></svg-icon>
                </el-icon>
                <el-icon title="重做" style="margin-left: 5px;" class="icon-hover" :size="20">
                    <svg-icon name="redo"></svg-icon>
                </el-icon>
                <el-divider direction="vertical"></el-divider>
                <el-icon title="清空" class="icon-hover" :size="20" @click="() => emit('clearData')">
                    <svg-icon name="clear"></svg-icon>
                </el-icon>
                <el-divider direction="vertical"></el-divider>
                <el-icon title="组件树" class="icon-hover" :size="20">
                    <svg-icon name="tree-list"></svg-icon>
                </el-icon>
                <el-divider direction="vertical"></el-divider>
                <el-icon
                    title="页面变量"
                    class="icon-hover"
                    :size="20"
                    @click="() => emit('topParamBtnClick')"
                >
                    <svg-icon name="params"></svg-icon>
                </el-icon>
                <el-divider direction="vertical"></el-divider>
                <el-icon title="导入json" class="icon-hover" :size="20">
                    <svg-icon name="import-json"></svg-icon>
                </el-icon>
                <el-icon title="导出json" :size="20" class="icon-hover" style="margin-left: 5px;">
                    <svg-icon name="export-json"></svg-icon>
                </el-icon>
                <el-divider direction="vertical"></el-divider>
                <el-icon title="生成代码" class="icon-hover" :size="20">
                    <svg-icon name="file-code"></svg-icon>
                </el-icon>
                <el-divider direction="vertical"></el-divider>
                <el-icon
                    @click="() => emit('topPreviewBtnClick')"
                    title="预览"
                    class="icon-hover"
                    :size="20"
                >
                    <View />
                </el-icon>
            </div>
            <!-- <div class="flex-h flex-v-center" style="margin-right: 20px;">
            </div>-->
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
import { ElIcon, ElButtonGroup, ElDivider, ElButton, ElRow } from 'element-plus';
import { ref } from 'vue';
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
const emit = defineEmits(['changeLeftBarFoldStatus', 'changeRightBarFoldStatus', 'topPreviewBtnClick', 'topParamBtnClick', 'changeLayout','clearData']);
const select_layout_type = ref('pc');
const changeLayout = (layout_type: string) => {
    select_layout_type.value = layout_type;
    emit('changeLayout', layout_type);
}
</script>
<style scoped lang="less">
@import "../../../assets/global.module";
.logoimg {
    height: 55px;
    width: 60px;
}
.logo-title{
    font-size: 15px;
    font-weight: 600;
}
.icon-hover {
    cursor: pointer;
    &:hover {
        color: rgb(80, 76, 76);
    }
}
.icon-disable {
    cursor: not-allowed;
    color: #ccc;
}
</style>