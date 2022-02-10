import { IConfigComponentGroup } from "../../../model/model";
import { D_ElCascader, D_ElCascaderPanel } from "./cascader";
import { D_ElCheckbox,D_ElCheckboxGroup } from "./checkbox";
import { D_ElColorPicker } from "./colorpicker";
import { D_ElDatePicker } from "./datepicker";
import { D_ElFormContainer } from "./form";
import { D_ElInput } from "./input";
export const ElFormGroup: IConfigComponentGroup = {
  groupType: "form",
  title: "表单组件",
  list: [D_ElCascader, D_ElCascaderPanel,D_ElCheckbox,D_ElCheckboxGroup,D_ElColorPicker,D_ElDatePicker,D_ElFormContainer,D_ElInput],
};
