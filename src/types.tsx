import INewsDetail from './components/News/types';
import {ICar} from './components/Search/types';

export type RootTabParamList = {
  IntroNavigation: undefined;
  News: undefined;
  NewsDetails: {
    item: INewsDetail;
  };
  NewsSource: undefined;
  Account: undefined;
  Search: undefined;
  SearchDetails: {
    item: ICar;
  };
  SearchItem: undefined;
  SearchSort: undefined;
  Cars: undefined;
  ChangeDetails: {
    item: ICar;
  };
  Registration: undefined;
  UserSettings: undefined;
  Create: undefined;
  CreateAdDetails: {
    mark?: string;
    paramType: string;
    onSelect: (paramType: string, item: string) => void;
  };
  LogOut: undefined;
  Map: undefined;
  CreateAdMap: {
    paramLocation: string;
    onSelect: (paramLocation: string, item: string) => void;
  };
};
