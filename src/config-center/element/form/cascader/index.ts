import { reactive, ref, watch, watchEffect } from "vue";
import {
  ERightToolAttrType,
  IConfigComponentItem,
  IConfigComponentItemProps,
} from "../../../../model/model";
const D_ElCascaderProps: IConfigComponentItemProps = {
  expandTrigger: {
    type: ERightToolAttrType.Radio,
    default: "click",
    title: "展开方式",
    tips: "次级菜单的展开方式",
    options: [
      {
        value: "click",
        label: "点击",
      },
      {
        value: "hover",
        label: "悬停",
      },
    ],
  },
  multiple: {
    type: ERightToolAttrType.Switch,
    default: false,
    title: "是否多选",
    tips: "是否多选",
  },
  checkStrictly: {
    type: ERightToolAttrType.Switch,
    default: false,
    title: "遵守不互相关联",
    tips: "是否严格的遵守父子节点不互相关联	",
  },
  emitPath: {
    type: ERightToolAttrType.Switch,
    default: true,
    title: "返回数组",
    tips: "在选中节点改变时,是否返回由该节点所在的各级菜单的值所组成的数组,若设置 false,则只返回该节点的值",
  },
  lazy: {
    type: ERightToolAttrType.Switch,
    default: false,
    title: "动态加载子节点",
    tips: "是否动态加载子节点,需与 lazyLoad 方法结合使用,暂未实现方法关联",
  },
  value: {
    type: ERightToolAttrType.Input,
    default: "value",
    title: "指定选项值",
    tips: "指定选项的值为选项对象的某个属性值",
  },
  label: {
    type: ERightToolAttrType.Input,
    default: "label",
    title: "指定选项标签",
    tips: "指定选项标签为选项对象的某个属性值",
  },
  children: {
    type: ERightToolAttrType.Input,
    default: "children",
    title: "指定子选项",
    tips: "指定选项的子选项为选项对象的某个属性值",
  },
  disabled: {
    type: ERightToolAttrType.Input,
    default: "disabled",
    title: "指定选项禁用",
    tips: "指定选项的禁用为选项对象的某个属性值",
  },
  leaf: {
    type: ERightToolAttrType.Input,
    default: "leaf",
    title: "指定叶子节点",
    tips: "指定选项的叶子节点的标志位为选项对象的某个属性值",
  },
};
export const D_ElCascader: IConfigComponentItem = {
  title: "级联选择器",
  icon: "cascader",
  domInfo: {
    tag: "el-cascader",
    title: "el级联选择器",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      options: {
        type: ERightToolAttrType.JsonEdit,
        default: [
          {
            value: "jilin",
            label: "吉林",
            children: [
              {
                value: "changchun",
                label: "长春",
                children: [
                  { value: "chaoyang", label: "朝阳区", children: [] },
                  { value: "jingyue", label: "净月区", children: [] },
                  { value: "erdao", label: "二道区", children: [] },
                ],
              },
              {
                value: "songyuan",
                label: "松原",
                children: [],
              },
              {
                value: "siping",
                label: "四平",
                children: [],
                disabled: true,
              },
            ],
          },
        ],
        title: "数据源",
        tips: "可选项数据源",
      },
      props: {
        type: ERightToolAttrType.ConfigEdit,
        default: {},
        config: D_ElCascaderProps,
        title: "配置选项",
        tips: "数据源配置选项",
      },
      size: {
        type: ERightToolAttrType.Select,
        default: "default",
        title: "尺寸",
        tips: "尺寸",
        options: [
          {
            value: "large",
            label: "大",
          },
          {
            value: "default",
            label: "默认",
          },
          {
            value: "small",
            label: "小",
          }
        ],
      },
      placeholder: {
        type: ERightToolAttrType.Input,
        default: "点击选择",
        title: "占位文本",
        tips: "输入框占位文本",
      },
      disabled: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "是否禁用",
        tips: "是否禁用",
      },
      clearable: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "支持清空",
        tips: "是否支持清空选项",
      },
      'show-all-levels': {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "完整路径",
        tips: "输入框中是否显示选中值的完整路径",
      },
      'collapse-tags': {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "多选折叠",
        tips: "多选模式下是否折叠Tag",
      },
      separator: {
        type: ERightToolAttrType.Input,
        default: "/",
        title: "分隔符",
        tips: "选项分隔符",
      },
      filterable: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "可搜索",
        tips: "是否可搜索选项",
      },
      debounce: {
        type: ERightToolAttrType.InputNumber,
        default: 300,
        title: "去抖延迟",
        tips: "搜索关键词输入的去抖延迟,毫秒",
      },
      'popper-class': {
        type: ERightToolAttrType.Input,
        default: "",
        title: "浮层类名",
        tips: "自定义浮层类名",
      },
      teleported: {
        type: ERightToolAttrType.Switch,
        default: false,
        title: "使用teleport",
        tips: "弹层是否使用teleport",
      },
      deprecated: {
        type: ERightToolAttrType.Switch,
        default: true,
        title: "插入body",
        tips: "是否将弹出框插入至body元素。在弹出框的定位出现问题时,可将该属性设置为 false",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
    compatibility:true,
    eventAttr:{
      change:{
        custom:true,
        tips:"当绑定值变化时触发的事件",
        val:"console.log('Cascader--值变化:'+value);",
        anonymous_params:['value'],
        list:[]
      },
      'expand-change':{
        custom:true,
        tips:"当展开节点发生变化时触发",
        val:"console.log('Cascader--各父级选项值组成的数组:'+value);",
        anonymous_params:['value'],
        list:[]
      },
      blur:{
        custom:true,
        tips:"当失去焦点时触发",
        val:"console.log('Cascader--失去焦点:'+JSON.stringify(e));",
        anonymous_params:['e'],
        list:[]
      },
      focus:{
        custom:true,
        tips:"当获得焦点时触发",
        val:"console.log('Cascader--获得焦点:'+JSON.stringify(e));",
        anonymous_params:['e'],
        list:[]
      },
      'visible-change':{
        custom:true,
        tips:"下拉框出现/隐藏时触发",
        val:"console.log('Cascader--下拉框状态:'+value);",
        anonymous_params:['value'],
        list:[]
      },
      'remove-tag':{
        custom:true,
        tips:"多选模式移除Tag时触发",
        val:"console.log('Cascader--移除Tag:'+value);",
        anonymous_params:['value'],
        list:[]
      },
    },
  },
};
export const D_ElCascaderPanel: IConfigComponentItem = {
  title: "级联面板",
  icon: "cascader-panel",
  domInfo: {
    tag: "el-cascader-panel",
    title: "el级联级联面板",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      options: {
        type: ERightToolAttrType.JsonEdit,
        default: [
          {
            value: "jilin",
            label: "吉林",
            children: [
              {
                value: "changchun",
                label: "长春",
                children: [
                  { value: "chaoyang", label: "朝阳区", children: [] },
                  { value: "jingyue", label: "净月区", children: [] },
                  { value: "erdao", label: "二道区", children: [] },
                ],
              },
              {
                value: "songyuan",
                label: "松原",
                children: [],
              },
              {
                value: "siping",
                label: "四平",
                children: [],
                disabled: true,
              },
            ],
          },
        ],
        title: "数据源",
        tips: "可选项数据源",
      },
      props: {
        type: ERightToolAttrType.ConfigEdit,
        default: {},
        config: D_ElCascaderProps,
        title: "配置选项",
        tips: "数据源配置选项",
      }
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
    eventAttr:{
      change:{
        custom:true,
        tips:"当绑定值变化时触发的事件",
        val:"console.log('CascaderPanel--值变化:'+value);",
        anonymous_params:['value'],
        list:[]
      },
      'expand-change':{
        custom:true,
        tips:"当展开节点发生变化时触发",
        val:"console.log('CascaderPanel--各父级选项值组成的数组:'+value);",
        anonymous_params:['value'],
        list:[]
      }
    },
  },
};