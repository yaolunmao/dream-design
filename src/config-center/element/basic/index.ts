import { IConfigComponentGroup } from "../../../model/model";
import { D_ElScrollbar } from "./scrollbar";
import { D_ElButton, D_ElButtonGroup } from "./button";
import { D_ElLink } from "./link";
export const ElBasicGroup: IConfigComponentGroup = {
  groupType: "basic",
  title: "基础",
  list: [D_ElButton, D_ElButtonGroup, D_ElLink, D_ElScrollbar],
};
