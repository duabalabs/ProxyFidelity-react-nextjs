import { ParseBaseClass } from '../class/baseClasses';
import Parse from 'parse/node';

export interface IParseServerAPICred {
  serverURL: string;
  appId: string;
  javascriptKey: string;
}

export interface SubClass {
  className: string;
  class: ParseBaseClass;
}

export class ParseInitialize {
  initialized = false;
  constructor(config: IParseServerAPICred, subClasses?: SubClass[]) {
    this.initialize(config, subClasses);
  }
  protected initialize(config: IParseServerAPICred, subClasses?: SubClass[]) {
    if (subClasses) {
      this.registerParseSubClasses(subClasses);
    }
    Parse.serverURL = config.serverURL;
    Parse.initialize(config.appId, config.javascriptKey);
    this.initialized = true;
  }
  registerParseSubClasses(subClasses: SubClass[]) {
    subClasses.forEach((subClass) =>
      Parse.Object.registerSubclass(subClass.className, subClass.class)
    );
  }
}
