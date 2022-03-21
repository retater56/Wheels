import INewsDetail from './components/News/types';
import {ICar} from './components/Search/types';

export type RootTabParamList = {
  News: undefined;
  NewsDetails: {
    item: INewsDetail;
  };
  Account: undefined;
  Search: undefined;
  SearchDetails: {
    item: ICar;
  };
  SearchItem: undefined;
  Ads: undefined;
  Registration: undefined;
};
