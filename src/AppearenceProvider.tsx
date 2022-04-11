import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';

type Props = {
  children: JSX.Element;
};

export default function Appearance({children}: Props) {
  return <AppearanceProvider>{children}</AppearanceProvider>;
}
