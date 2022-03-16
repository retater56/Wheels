import INewsDetail from "./components/News/types";
import ICar from "./components/Search/types";

export type RootTabParamList = {
  News: undefined;
  NewsDetails: {
      item: INewsDetail
    };
  Account: undefined;
  Search: undefined;
  SearchDetails: {
      item: ICar
  },
  Ads: undefined;
  Registration: undefined;
  Create: undefined;
  CreateAdDetails: {
    mark?: string,
    paramType: string,
    onSelect: (paramType: string, item: string) => void,
  };
};