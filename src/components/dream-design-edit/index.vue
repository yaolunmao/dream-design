<!-- 编辑器组件 -->
<script setup lang="ts">
import { ref, provide, reactive, readonly, pushScopeId } from 'vue';
import "element-plus/dist/index.css";
import 'ant-design-vue/dist/antd.css';
import LeftNav from './left-nav/index.vue';
import CanvasMain from './canvas-main/index.vue';
import TopBar from './top-bar/index.vue';
import RightNav from './right-nav/index.vue';
import ParamEdit from './param_edit/index.vue';
import { IDoneComponent, IParamEdit } from '../../model/model';
import { ElContainer, ElHeader, ElAside, ElFooter, ElMain, ElScrollbar, ElLink, ElOption, ElDialog, ElButton } from "element-plus";
import 'virtual:svg-icons-register';
import RenderComponent from './render-component/index.vue';
import { objectDeepClone, randomString } from '../../utils';
const doneComponents = ref<IDoneComponent[]>([]);
let select_component_info = ref({});//选中的组件
const changeSelectedComponentInfo = (val: IDoneComponent) => {
    //整么写是为了方便v-model修改选中组件的属性 所以不再用vuex
    select_component_info.value = val;
}
const deleteSelectCompont = () => {
    handleCompont(doneComponents.value, 1);
}
const copySelectCompont = () => {
    handleCompont(doneComponents.value, 2);
}
const assignmentID = (done_compont: IDoneComponent) => {
    done_compont.id = done_compont.tag + '-' + randomString();
    if (done_compont.childrens?.length > 0) {
        done_compont.childrens.forEach(f => {
            assignmentID(f)
        });
    }
}
const handleCompont = (doneComponents: IDoneComponent[], type: Number) => {
    const index = doneComponents.indexOf(select_component_info.value as IDoneComponent);
    if (index == -1) {
        doneComponents.forEach(f => {
            handleCompont(f.childrens, type)
        });
    }
    else {
        if (type == 1) {
            doneComponents.splice(index, 1)
        }
        else {
            const select_component = (select_component_info.value as IDoneComponent);
            const temp_component: IDoneComponent = objectDeepClone(select_component)
            assignmentID(temp_component);
            doneComponents.push(temp_component);
        }

    }

}

provide('select_component_info', select_component_info);
provide('changeSelectedComponentInfo', changeSelectedComponentInfo);
provide('deleteSelectCompont', deleteSelectCompont);
provide('copySelectCompont', copySelectCompont);
const leftBarFoldStatus = ref(true);
const rightBarFoldStatus = ref(true);
const dialogVisible = ref(false);
const previewDialogVisible = ref(false);
const changeLeftBarFoldStatus = () => {
    leftBarFoldStatus.value = !leftBarFoldStatus.value;
}
const changeRightBarFoldStatus = () => {
    rightBarFoldStatus.value = !rightBarFoldStatus.value;
}
const param_tabledata = ref<IParamEdit[]>([]);
</script>
<template>
    <div>
        <el-container>
            <el-header class="top-el-header">
                <top-bar
                    :leftBarFoldStatus="leftBarFoldStatus"
                    :rightBarFoldStatus="rightBarFoldStatus"
                    @changeLeftBarFoldStatus="changeLeftBarFoldStatus"
                    @changeRightBarFoldStatus="changeRightBarFoldStatus"
                    @topParamBtnClick="dialogVisible = true"
                    @topPreviewBtnClick="previewDialogVisible = true"
                ></top-bar>
            </el-header>
            <el-container class="middle">
                <el-aside class="side-nav" :class="leftBarFoldStatus ? 'show-nav' : 'hide-nav'">
                    <left-nav class="content-left"></left-nav>
                </el-aside>
                <el-main class="middle main">
                    <el-scrollbar>
                        <canvas-main class="canvas-main" :doneComponents="doneComponents"></canvas-main>
                    </el-scrollbar>
                </el-main>
                <el-aside class="side-nav" :class="rightBarFoldStatus ? 'show-nav' : 'hide-nav'">
                    <right-nav class="content-right"></right-nav>
                </el-aside>
            </el-container>
            <el-footer class="bottom-el-footer flex-h flex-center">Copyright (c) 2022<el-link href="https://gitee.com/yaolunmao" style="margin-left: 10px;">咬轮猫</el-link></el-footer>
        </el-container>
        <el-dialog v-model="dialogVisible" title="变量编辑(开发中)" width="100%">
            <param-edit :paramTableData="param_tabledata"></param-edit>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="previewDialogVisible" title="预览" width="100%">
            <render-component
                v-for="item in doneComponents"
                :leftDragDomInfo="item"
                :previewMode="true"
            ></render-component>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
@import "../../assets/global.module";
@headerHeight: 60px;
@buttomHeight: 60px;
.middle {
    min-height: calc(100vh - (@headerHeight + @buttomHeight));
    // max-height: calc(100vh - (@headerHeight + @buttomHeight));
    &.main {
        margin: 0px 5px;
        background-color: #ffffff;
        padding: 0px 2px;
    }
    .side-nav {
        @showLeftNavWidth: 240px;
        @hideLeftNavWidth: 0px;
        position: relative;
        overflow: inherit;
        transition: all 0.5s;
        // background-color: rgb(250, 251, 253);
        box-shadow: 0px 0px 2px #dfcfcf;
        .content-left {
            overflow: hidden;
            margin: 0px 1vh;
        }
        .content-right {
            overflow: hidden;
            margin: 0px 1vh;
            // padding: 5px;
        }
        &.show-nav {
            flex: 0 0 @showLeftNavWidth;
            min-width: @showLeftNavWidth;
            max-width: @showLeftNavWidth;
        }
        &.hide-nav {
            flex: 0 0 @hideLeftNavWidth;
            min-width: @hideLeftNavWidth;
            max-width: @hideLeftNavWidth;
        }
    }
    .canvas-main {
        min-height: calc(100vh - (@headerHeight + @buttomHeight));
    }
}
.top-el-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 0px 2px #dfcfcf;
    margin-bottom: 1px;
    height: 45px;
}
.bottom-el-footer {
    box-shadow: 0px -1px 0px 0px #dfcfcf;
    margin-top: 1px;
}
</style>