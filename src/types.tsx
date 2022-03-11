import INewsDetail from "./components/News/types";
import ICar from "./components/Search/types";

export type RootTabParamList = {
  News: undefined;
  NewsDetails: {
      item: INewsDetail
    };
  Registration: undefined;
  Search: undefined;
  SearchDetails: {
      item: ICar
  },
  Ads: undefined;

  

//   SELLING?: {
//     shouldOpenOffers: boolean;
//   };
//   BUY?: {
//     shouldOpenOffers: boolean;
//   };
//   PORTFOLIO?: {
//     shouldEnterSelectMode?: boolean;
//   };
//   CAPITAL: undefined;
};

// export type RootTabScreen<RouteName extends keyof RootTabParamList = any> = CompositeScreenProps<
//   BottomTabScreenProps<RootTabParamList, RouteName>,
//   RootDrawerScreen<'TABS'>
// >;
