import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const useOrientation = () => {
  const [orientation, setOrientation] = useState(isPortrait());

  useEffect(() => {
    const checkOrientation = () => setOrientation(isPortrait());
    Dimensions.addEventListener('change', checkOrientation);
  }, []);

  return orientation;
};

export default useOrientation;
