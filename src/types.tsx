import INewsDetail from './components/News/types';
import {ICar} from './components/Search/types';

export type RootTabParamList = {
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
  Ads: undefined;
  ChangeDetails: {
    item: ICar;
  };
  Registration: undefined;
  Create: undefined;
  CreateAdDetails: {
    mark?: string;
    paramType: string;
    onSelect: (paramType: string, item: string) => void;
  };
  LogOut: undefined;
  UserMap: undefined;
  CreateAdMap: {
    paramLocation: string;
    onSelect: (paramLocation: string, item: string) => void;
  };
};
