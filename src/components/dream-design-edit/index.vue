<!-- 编辑器组件 -->
<script setup lang="ts">
import { ref, provide, reactive, readonly, watch, getCurrentInstance } from 'vue';
import "element-plus/dist/index.css";
import 'ant-design-vue/dist/antd.css';
import LeftNav from './left-nav/index.vue';
import CanvasMain from './canvas-main/index.vue';
import TopBar from './top-bar/index.vue';
import RightNav from './right-nav/index.vue';
import ParamEdit from './param_edit/index.vue';
import { IConfigComponentItemInfo, IDoneComponent, IParamEdit } from '../../model/model';
import { ElContainer, ElHeader, ElAside, ElFooter, ElMain, ElScrollbar, ElLink, ElOption, ElDialog, ElButton } from "element-plus";
import 'virtual:svg-icons-register';
import { objectDeepClone, randomString } from '../../utils';
import * as Icons from "@element-plus/icons-vue";
import { ComponentImport } from "../../config-center";
const instance = getCurrentInstance();
Object.keys(ComponentImport).forEach((key) => {
    instance?.appContext.app.component(key, ComponentImport[key]);
});
// 注册element所有icon
Object.keys(Icons).forEach((key) => {
    instance?.appContext.app.component(key, (Icons as any)[key]);
});
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
// provide('deleteSelectCompont', deleteSelectCompont);
// provide('copySelectCompont', copySelectCompont);
const leftBarFoldStatus = ref(true);
const rightBarFoldStatus = ref(true);
const dialogVisible = ref(false);
const previewDialogVisible = ref(false);
const global_config = ref<IConfigComponentItemInfo[]>([]);
const changeLeftBarFoldStatus = () => {
    leftBarFoldStatus.value = !leftBarFoldStatus.value;
}
const changeRightBarFoldStatus = () => {
    rightBarFoldStatus.value = !rightBarFoldStatus.value;
}
const layout = reactive({
    scroll: "elscrooll-pc",
    canvas: "canvas-main-pc"
});
const changeLayout = (select_layout_type: string) => {
    if (select_layout_type == 'pc') {
        layout.scroll = 'elscrooll-pc';
        layout.canvas = 'canvas-main-pc';
    }
    else if (select_layout_type == 'pad') {
        layout.scroll = 'elscrooll-pad';
        layout.canvas = 'canvas-main-pad';
    }
    else if (select_layout_type == 'h5') {
        layout.scroll = 'elscrooll-h5';
        layout.canvas = 'canvas-main-h5';
    }
}
const setGlobalConfig = (config: IConfigComponentItemInfo[]) => {
    global_config.value = config;
}
const param_tabledata = ref<IParamEdit[]>([]);
//右键菜单
const contextMenuRef = ref<HTMLElement>();
//显示右键菜单
const display_contextmenu = ref(false);
//右键菜单数据
const contextmenu_data = reactive([{
    name: "复制",
    hotkey: "Ctrl+C",
    enable: true,
    fun: function () {
        if (!this.enable) {
            return;
        }
        copySelectCompont();
        display_contextmenu.value = false;
    }
}, {
    name: "删除",
    hotkey: "Delete",
    enable: false,
    fun: function () {
        if (!this.enable) {
            return;
        }
        deleteSelectCompont();
        display_contextmenu.value = false;
    }
}]);
/**
 * @description: 鼠标右键
 * @param {*}
 * @return {*}
 */
const contextmenuEvent = (e: MouseEvent) => {
    e.preventDefault();
    display_contextmenu.value = true;
    (contextMenuRef.value as any).style.left = e.clientX + 'px';
    (contextMenuRef.value as any).style.top = e.clientY + 'px';
    contextmenu_data.map(m => m.enable = true);
    //判断当前选中组件的index
    //   if (svgLists.length === 1) {
    //     //禁用下移
    //     contextmenu_data[3].enable = false;
    //     contextmenu_data[5].enable = false;
    //     //禁用上移
    //     contextmenu_data[2].enable = false;
    //     contextmenu_data[4].enable = false;
    //   }
    //   else if (select_svg.index === 0) {
    //     //禁用下移
    //     contextmenu_data[3].enable = false;
    //     contextmenu_data[5].enable = false;

    //   }
    //   else if (select_svg.index === svgLists.length - 1) {
    //     //禁用上移
    //     contextmenu_data[2].enable = false;
    //     contextmenu_data[4].enable = false;
    //   }

}
/**
 * @description: 点击页面其他位置隐藏右键菜单
 * @param {*}
 * @return {*}
 */
const documentClickEvent = (e: MouseEvent) => {
    display_contextmenu.value = false;
}
</script>
<template>
    <div @click="documentClickEvent">
        <el-container>
            <el-header class="top-el-header">
                <top-bar
                    :leftBarFoldStatus="leftBarFoldStatus"
                    :rightBarFoldStatus="rightBarFoldStatus"
                    @changeLeftBarFoldStatus="changeLeftBarFoldStatus"
                    @changeRightBarFoldStatus="changeRightBarFoldStatus"
                    @topParamBtnClick="dialogVisible = true"
                    @topPreviewBtnClick="previewDialogVisible = true"
                    @changeLayout="changeLayout"
                    @clearData="doneComponents = []"
                ></top-bar>
            </el-header>
            <el-container class="middle">
                <el-aside class="side-nav" :class="leftBarFoldStatus ? 'show-nav' : 'hide-nav'">
                    <left-nav class="content-left" @setGlobalConfig="setGlobalConfig"></left-nav>
                </el-aside>
                <el-main class="middle main">
                    <el-scrollbar :class="layout.scroll">
                        <div>
                            <canvas-main
                                :class="layout.canvas"
                                :doneComponents="doneComponents"
                                @contextmenuEvent="contextmenuEvent"
                                style="padding: 2px;"
                            ></canvas-main>
                        </div>
                    </el-scrollbar>
                </el-main>
                <el-aside class="side-nav" :class="rightBarFoldStatus ? 'show-nav' : 'hide-nav'">
                    <right-nav class="content-right" :globalConfig="global_config"></right-nav>
                </el-aside>
            </el-container>
            <el-footer class="bottom-el-footer flex-h flex-center">
                Copyright (c) 2022
                <el-link href="https://gitee.com/yaolunmao" style="margin-left: 10px;">咬轮猫</el-link>
            </el-footer>
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
            <div>
                <canvas-main
                    :doneComponents="doneComponents"
                    :class="layout.canvas"
                    @contextmenuEvent="contextmenuEvent"
                    :previewMode="true"
                ></canvas-main>
            </div>
        </el-dialog>
        <!-- 右键菜单 -->
        <ul ref="contextMenuRef" class="contextMenu" v-show="display_contextmenu">
            <li v-for="(item, index) in contextmenu_data" :key="index" @click="item.fun()">
                <p :class="item.enable ? '' : 'disabled'">
                    {{ item.name }}
                    <span class="shortcut">{{ item.hotkey }}</span>
                </p>
            </li>
        </ul>
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
.contextMenu {
    position: absolute;
    z-index: 99999;
    background: #ffffff;
    padding: 5px 0;
    margin: 0px;
    display: block;
    border-radius: 5px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);
    li {
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    .shortcut {
        width: 115px;
        text-align: right;
        float: right;
    }
    p {
        text-decoration: none;
        display: block;
        padding: 0px 15px 1px 20px;
        margin: 0;
        user-select: none;
        -webkit-user-select: none;
    }
    p:hover {
        background-color: #0cf;
        color: #ffffff;
        cursor: default;
    }
    .disabled {
        color: #999;
    }
    .disabled:hover {
        color: #999;
        background-color: transparent;
    }
    li.separator {
        border-top: solid 1px #e3e3e3;
        padding-top: 5px;
        margin-top: 5px;
    }
}
</style>
<style lang="less">
@headerHeight: 60px;
@buttomHeight: 60px;
.elscrooll-pc {
    height: calc(100vh - (@headerHeight + @buttomHeight));
}
.canvas-main-pc {
    min-height: calc(100vh - (@headerHeight + @buttomHeight));
    width: 100%;
    margin: 0 auto;
}
.elscrooll-pad {
    height: 1024px;
}
.canvas-main-pad {
    width: 768px;
    min-height: 1024px;
    margin: 0px auto;
    box-shadow: 0 0px 10px 4px #d6d8db;
}
.elscrooll-h5 {
    height: 844px;
}
.canvas-main-h5 {
    width: 390px;
    min-height: 844px;
    margin: 0px auto;
    box-shadow: 0 0px 10px 4px #d6d8db;
}
</style>