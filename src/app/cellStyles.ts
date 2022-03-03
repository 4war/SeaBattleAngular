import {States} from "./Models/States";
import {Sides} from "./Models/Sides";

export const CellStyles = new Map<Sides, Map<States, string>>([
  [Sides.User, new Map<States, string>([
    [States.Clear, "assets/images/User/CellEmpty.png"],
    [States.Empty, "assets/images/User/CellEmpty.png"],
    [States.Shot, "assets/images/User/CellCross.png"],
    [States.HasShip, "assets/images/User/CellCross.png"],
    [States.Destroyed, "assets/images/User/CellCross.png"],
    [States.Selected, "assets/images/User/CellSelected.png"],
    [States.Unavailable, "assets/images/User/CellPoint.png"],
  ])],
  [Sides.Ai, new Map<States, string>([
    [States.Clear, "assets/images/AI/CellEmpty.png"],
    [States.Empty, "assets/images/AI/CellEmpty.png"],
    [States.Shot, "assets/images/AI/CellCross.png"],
    [States.HasShip, "assets/images/AI/CellCross.png"],
    [States.Destroyed, "assets/images/AI/CellCross.png"],
    [States.Selected, "assets/images/AI/CellSelected.png"],
    [States.Unavailable, "assets/images/AI/CellPoint.png"],
  ])]

])



