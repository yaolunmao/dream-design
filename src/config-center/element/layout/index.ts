import { IConfigComponentGroup } from "../../../model/model";
import { D_ElGrid1,D_ElGrid2 } from "./grid";
import { D_ElContainer1,D_ElContainer2,D_ElContainer3,D_ElContainer4 } from "./container";
export const ElLayoutGroup: IConfigComponentGroup = {
  groupType: "layout",
  title: "布局",
  list: [D_ElGrid1, D_ElGrid2, D_ElContainer1,D_ElContainer2,D_ElContainer3,D_ElContainer4],
};
