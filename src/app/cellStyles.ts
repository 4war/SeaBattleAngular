import {states} from "./Models/States";
import {sides} from "./Models/Sides";

export const CellStyles = new Map<sides, Map<states, string>>([
  [sides.User, new Map<states, string>([
    [states.Clear, "assets/images/User/CellEmpty.png"],
    [states.Empty, "assets/images/User/CellEmpty.png"],
    [states.Shot, "assets/images/User/CellCross.png"],
    [states.HasShip, "assets/images/User/CellCross.png"],
    [states.Destroyed, "assets/images/User/CellCross.png"],
    [states.Selected, "assets/images/User/CellSelected.png"],
  ])],
  [sides.Ai, new Map<states, string>([
    [states.Clear, "assets/images/AI/CellEmpty.png"],
    [states.Empty, "assets/images/AI/CellEmpty.png"],
    [states.Shot, "assets/images/AI/CellCross.png"],
    [states.HasShip, "assets/images/AI/CellCross.png"],
    [states.Destroyed, "assets/images/AI/CellCross.png"],
    [states.Selected, "assets/images/AI/CellSelected.png"],
  ])]

])



