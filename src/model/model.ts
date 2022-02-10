/**
 * 组件默认数据格式
 * @property {string} title 左侧工具栏组件的显示名称
 * @property {string} icon 组件的前缀图标
 * @property {IConfigComponentItemInfo} domInfo 组件的dom信息
 * @export
 * @interface IConfigComponentItem
 */
export interface IConfigComponentItem {
  title: string;
  icon: string;
  domInfo: IConfigComponentItemInfo;
}

/**
 * 组件dom信息格式
 * @property {string} tag 组件dom标签
 * @property {boolean} slots 是否具有插槽
 * @property {boolean} canMove 是否可以移动
 * @property {IConfigComponentItemInfo[]} childrens 默认插槽
 * @export
 * @interface IConfigComponentItemInfo
 */
export interface IConfigComponentItemInfo {
  tag: string;
  title: string;
  slots: boolean;
  canMove: boolean;
  canAllowTo: boolean;
  ClearStyle: boolean;
  tagSlots: {
    enable: boolean;
    val: any;
  };
  childrens: IConfigComponentItemInfo[];
  props: IConfigComponentItemProps;
  extProps?: { [key: string]: IDomExtProps };
  classAttr?: IClassAttr;
  eventAttr?: IEventAttr;
  v_model?: "";
}
export interface IConfigComponentItemProps {
  [key: string]: {
    type: string;
    default: any;
    source?: IConfigComponentItemPropsSource;
    title: string;
    tips: string;
    options?: { value: any; label: string }[];
    config?: IConfigComponentItemProps;
  };
}
//数据源来源 本地 远程 变量 待开发
export enum IConfigComponentItemPropsSource {
  Local = "Local",
  Remote = "Remote",
  variable = "Variable",
}
/**
 * 组件分组数据格式
 * @property {string} groupType 组件分组类型
 * @property {string} title 组件分组标题
 * @property {IConfigComponentItem[]} list 分组包含的组件项列表
 * @export
 * @interface IComponentGroup
 */
export interface IConfigComponentGroup {
  groupType: string;
  title: string;
  list: IConfigComponentItem[];
}
export enum ERightToolAttrType {
  Input = "Input",
  InputNumber = "InputNumber",
  ColorPicker = "ColorPicker",
  Select = "Select",
  Switch = "Switch",
  Radio = "Radio",
  JsonEdit = "JsonEdit",
  ConfigEdit = "ConfigEdit",
}
export interface IDoneComponent
  extends Omit<IConfigComponentItemInfo, "childrens"> {
  id: string;
  childrens: IDoneComponent[];
}
export interface IComponentImport {
  [key: string]: any;
}
export enum IDomExtProps {
  ChangeChildrenCount = "ChangeChildrenCount", //可以改变插槽内子元素个数最小为1
}
export interface IGloablCss {
  class_name: string;
  value: object;
  label: string;
  tips: string;
}
export interface IGloablEvent {
  event_name: string;
  value: string;
  label: string;
  tips: string;
}
export interface IClassAttr {
  global: string[];
  custom?: {
    [key: string]: string;
  };
}
export interface IEventAttr {
  [key: string]: {
    custom: boolean;
    tips: string;
    val: string;
    anonymous_params: string[];
    list: string[];
  };
}
export enum IEventAttrType {
  Call = "call", //代表调用
  Custom = "custom", //代表自定义
}
export enum IMonacoLanguage {
  TypeScript = "typescript",
  JavaScript = "javascript",
  CSS = "css",
  JSON = "json",
}
export interface IParamEdit {
  name: string;
  type: IParamEditType;
  value_type: IParamEditValueType;
  val: any;
}
/**
 * 响应式类型
 */
export enum IParamEditType {
  None = "",
  Ref = "ref",
  Reactive = "reactive",
}
/**
 * 值类型
 */
export enum IParamEditValueType {
  String = "string",
  Boolean = "bool",
  Number = "number",
  Object = "object",
  Array = "array",
}
