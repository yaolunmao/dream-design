<!-- 左侧工具栏 -->
<template>
  <div>
    <div class="flex-h flex-v-center" style="margin: 5px 0px;">
      <div style="min-width:60px;font-weight: bolder;font-style: italic;">组件库 :</div>
      <el-select v-model="select_lib" placeholder="请选择组件库" @change="libChange">
        <el-option v-for="(item, key) in configCenter" :key="key" :label="key" :value="item"></el-option>
      </el-select>
    </div>

    <el-collapse v-model="activeNames" @change="handleChange" v-for="item of config_center">
      <el-collapse-item :name="item.groupType">
        <template #title>
          <div style="font-weight: bolder;">{{ item.title }}</div>
        </template>
        <draggable
          class="component-group flex-h flex-warp"
          v-model="item.list"
          :group="{ name: 'design-group', pull: 'clone', put: false }"
          :clone="setCloneData"
          item-key="title"
          :move="checkMove"
        >
          <template #item="{ element }">
            <div class>
              <div class="flex-h component-item flex-v-center">
                <el-icon size="20" style="margin-left: 10px;">
                  <svg-icon :name="element.icon"></svg-icon>
                </el-icon>
                <div style="margin-left: 5px;">{{ element.title }}</div>
              </div>
            </div>
          </template>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { configCenter } from '../../../config-center';
import draggable from 'vuedraggable/src/vuedraggable';
import { IConfigComponentGroup, IConfigComponentItem, IConfigComponentItemInfo, IConfigComponentItemProps, IDoneComponent, IDoneComponentProps } from '../../../model/model';
import { ElSelect, ElOption, ElCollapse, ElCollapseItem, ElIcon } from "element-plus";
import SvgIcon from "../../svg-icon/index.vue";
import { objectDeepClone, randomString } from '../../../utils';
// import { useStore } from 'vuex';
// import { IStoreDoneComponent } from '../../store/model';
const emit = defineEmits(['setGlobalConfig']);
const select_lib = ref('element');
const config_center = ref<IConfigComponentGroup[]>(configCenter.element);
// const store = useStore();
// store.dispatch('changeConfigComponentGroup', config_center.value);
const activeNames = ref(['layout', 'basic', 'data', 'form', 'line', 'bar', 'pie', 'echartscustom'])
const handleChange = (val: string[]) => {
  // console.log(val)
}
const libChange = (val: any) => {
  config_center.value = val;
  // store.dispatch('changeConfigComponentGroup', config_center.value);
}
const setGlobalConfig = () => {
  let temp: IConfigComponentItemInfo[] = [];
  for (let key in configCenter) {
    configCenter[key].forEach(f => {
      f.list.forEach(fl => {
        temp.push({ ...fl.domInfo });
      })
    });
  }
  emit('setGlobalConfig',temp)
  console.log(temp);
}
setGlobalConfig();
/**
 * 判断是否可以移动 主要是为了让左侧的工具栏不动
 * @param e 
 */
const checkMove = (e: any) => {
  if (e.to.className == e.from.className) {
    return false;
  }
}

/**
 * 处理组件默认配置的子项 实际上就是为了生成id
 * @param childrens 
 */
const handleConfigChildrens = (childrens: IConfigComponentItemInfo[]) => {
  let temp: IDoneComponent[] = [];
  childrens.forEach(children => {
    const { childrens,props,...temp_params } = children;
    temp.push({
      id: temp_params.tag + '-' + randomString(),
      childrens: handleConfigChildrens(childrens),
      props:handleConfigProps(props),
      ...temp_params,
    });
  });
  return temp;
};
const handleConfigProps = (props: IConfigComponentItemProps) => {
  let temp: IDoneComponentProps = {};
  for (let key in props) {
    temp = { ...temp, ...{ [key]: { default: props[key].default,config: props[key].config} } }
  }
  return temp;
}
const setCloneData = (e: IConfigComponentItem) => {
  const { childrens, props, ...component_info } = e.domInfo;
  //将组件默认属性处理为完成组件的格式
  const doneComponent: IDoneComponent = {
    id: e.domInfo.tag + '-' + randomString(),
    childrens: handleConfigChildrens(e.domInfo.childrens),
    props: handleConfigProps(props),
    ...component_info
  }
  //这个数据就是完成组件的格式
  return {
    ...objectDeepClone(doneComponent)
  };
}
</script>
<style scoped lang="less">
@import "../../../assets/global.module";
.component-item {
  width: 100px;
  height: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 2px 0px 2px 6px;
  &:hover {
    cursor: move;
    // outline: 1px solid #409eff;
    box-shadow: 0 4px 16px rgb(0 0 0 / 10%);
  }
}
</style>