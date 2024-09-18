import Parse from 'parse/node'
import { IMessage as IGiftedChatMessage } from "react-native-gifted-chat";

export interface IMessage extends Parse.Object, IGiftedChatMessage {
}
