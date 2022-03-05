import {State} from "./Models/State";
import {Side} from "./Models/Side";

export const CellStyles = new Map<Side, Map<State, string>>([
  [Side.User, new Map<State, string>([
    [State.Clear, "assets/images/User/CellEmpty.png"],
    [State.HasShip, "assets/images/User/CellShip.png"],
    [State.Destroyed, "assets/images/User/CellDestroyed.png"],
    [State.Selected, "assets/images/User/CellSelected.png"],
    [State.Unavailable, "assets/images/User/CellPoint.png"],
  ])],
  [Side.Ai, new Map<State, string>([
    [State.Clear, "assets/images/AI/CellEmpty.png"],
    [State.HasShip, "assets/images/AI/CellShip.png"],
    [State.Destroyed, "assets/images/AI/CellDestroyed.png"],
    [State.Selected, "assets/images/AI/CellSelected.png"],
    [State.Unavailable, "assets/images/AI/CellPoint.png"],
  ])]

])



