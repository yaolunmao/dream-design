import { ERightToolAttrType, IConfigComponentItem } from "../../../../model/model";

export const D_ElCustomBasicTable: IConfigComponentItem = {
  title: "基础表格",
  icon: "table",
  domInfo: {
    tag: "custom-basic-table",
    title: "自定义el基础表格Demo,只是为了演示自定义组件",
    slots: false,
    canMove: true,
    canAllowTo: false,
    ClearStyle: false,
    props: {
      "table-query-url": {
        type: ERightToolAttrType.Select,
        default: "/mock/custo_basic_table1.json",
        title: "接口地址",
        tips: "为了演示采用了下拉选择",
        options: [
          {
            value: "/mock/custo_basic_table1.json",
            label: "人员信息接口",
          },
          {
            value: "/mock/custo_basic_table2.json",
            label: "编程语言受欢迎度",
          },
        ],
      },
      tableAddUrl: {
        type: ERightToolAttrType.Input,
        default: "https://www.test.com/add/",
        title: "新增地址",
        tips: "新增数据接口地址",
      },
      tableEditUrl: {
        type: ERightToolAttrType.Input,
        default: "https://www.test.com/edit/",
        title: "编辑地址",
        tips: "编辑数据接口地址",
      },
      tableDeleteUrl: {
        type: ERightToolAttrType.Input,
        default: "https://www.test.com/delete/",
        title: "删除地址",
        tips: "删除数据接口地址",
      },
    },
    tagSlots: {
      enable: false,
      val: "",
    },
    childrens: [],
  },
};
