import {states} from "./States";
import {sides} from "./Sides";

export class cell {
  public x:number = 0;
  public y:number = 0;
  public state: states = states.Clear;
  public side: sides = sides.User;
}
