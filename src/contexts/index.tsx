import { IParseServerAPICred } from 'lib/parse';
import { useParseConnect } from 'lib/parse/hook/useParseConnect';
import React from 'react';
import {createContext} from 'react';
import * as dotenv from "dotenv";
dotenv.config();

export const AppContext = createContext({});

export const AppDataProvider = ({children}: any) => {
  const parseConfig: IParseServerAPICred = {
    serverURL: process.env.PARSE_SERVER_URL,
    appId: process.env.PARSE_APP_ID,
    javascriptKey: process.env.PARSE_JAVASCRIPT_KEY
  }

  const {user, loadingParse} = useParseConnect(parseConfig);

  return (
    <AppContext.Provider value={{user, loadingParse}}>
      {children}
    </AppContext.Provider>
  );
};
