import { IMessage } from "./types"
import { IMessage as IGiftedChatMessage } from "react-native-gifted-chat";
import { ParseBaseClass } from "../../baseClasses";

export const MESSAGE_CLASSNAME = "Message";

export interface Message extends IMessage {}
export class Message extends ParseBaseClass {
  constructor(message?: IGiftedChatMessage) {
    super(MESSAGE_CLASSNAME);
    this.fromObject(message);
  }
}
