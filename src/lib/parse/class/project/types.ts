import Parse from 'parse/node'
import {
  Address,
  Payment,
  User,
} from "..";
import { ICoordinates } from "../address/types";


export interface IProject extends Parse.Object {
  user: User;
}
