
import {useEffect, useState} from 'react';
import Parse from 'parse/react-native';
import { IParseServerAPICred, ParseInitialize } from '../initialize';
import { SubClasses } from '../class';

export const useParseConnect = (parseConfig: IParseServerAPICred) => {
  const [user, setUser] = useState<Parse.User<Parse.Attributes>>();
  const [loadingParse, setLoadingParse] = useState(true);
  useEffect(() => {
    const getConnected = async () => {
      const cloud = new ParseInitialize(parseConfig, SubClasses);

      let currentUser =
        (await Parse.User.currentAsync()) ??
        (await Parse.AnonymousUtils.logIn());

      if (currentUser) {
        setUser(currentUser);
      }
      setLoadingParse(false);
    };

    getConnected();
  }, [parseConfig]);

  return {user, loadingParse};
};
