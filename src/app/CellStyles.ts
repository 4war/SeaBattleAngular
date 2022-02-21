import {States} from "./Models/States";
import {Sides} from "./Models/Sides";

type EnumDictionary<T, U> = {
  [K in keyof T]: U;
};

// export const CellStyles: EnumDictionary<States, string> = {
//   [States.Clear]: '',
//   [States.Empty]: '',
// };

export const CellStyles = new Map<States, string>([
  [States.Clear, "assets/images/HQCellEmpty.png"],
  [States.Empty, "assets/images/HQCellEmpty.png"],
  [States.Shot, "assets/images/HQCellPoint.png"],
  [States.HasShip, "assets/images/HQCellPoint.png"],
  [States.Destroyed, "assets/images/HQCellCross.png"],
  [States.Selected, "assets/images/HQCellSelected.png"],
])

export const test = new Map<Sides, string>([
  [Sides.User, "assets/images/HQCellEmpty.png"],
  [Sides.Ai, "assets/images/HQCellEmpty.png"]
])

export const CellStylesTest = new Map<Sides, Map<States, string>>([
  [Sides.User, new Map<States, string>([
    [States.Clear, "assets/images/HQCellEmpty.png"],
    [States.Empty, "assets/images/HQCellEmpty.png"],
    [States.Shot, "assets/images/HQCellPoint.png"],
    [States.HasShip, "assets/images/HQCellPoint.png"],
    [States.Destroyed, "assets/images/HQCellCross.png"],
    [States.Selected, "assets/images/HQCellSelected.png"],
  ])],
  [Sides.Ai, new Map<States, string>([
    [States.Clear, "assets/images/HQCellEmpty.png"],
    [States.Empty, "assets/images/HQCellEmpty.png"],
    [States.Shot, "assets/images/HQCellPoint.png"],
    [States.HasShip, "assets/images/HQCellPoint.png"],
    [States.Destroyed, "assets/images/HQCellCross.png"],
    [States.Selected, "assets/images/HQCellSelected.png"],
  ])]

])



