import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useCallback, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import {useTheme} from '../../ThemeProvider';
import commonStyles from './styles';

interface IProps {
  secureTextEntry?: boolean;
}

const CustomTextInput = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TextInput> &
    Readonly<TextInputProps> &
    Readonly<{children?: React.ReactNode}> &
    IProps,
) => {
  const {colors} = useTheme();
  const [inputFocus, setInputFocus] = useState({
    borderColor: colors.white,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState<'eye' | 'eye-slash'>('eye');

  const {secureTextEntry} = props;

  const handlePasswordVisibility = useCallback(() => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-slash');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-slash') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }, [passwordVisibility]);

  const onInputFocus = useCallback(() => {
    setInputFocus({
      borderColor: colors.secondary,
    });
  }, []);

  const onInputBlur = useCallback(() => {
    setInputFocus({
      borderColor: colors.gray,
    });
  }, []);

  return (
    <View
      style={[
        styles.container,
        inputFocus,
        {backgroundColor: colors.background},
      ]}>
      {secureTextEntry ? (
        <>
          <TextInput
            {...props}
            style={[styles.text, {color: colors.text}]}
            placeholderTextColor={colors.gray}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <Icon name={rightIcon} size={22} color={colors.text} />
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          {...props}
          editable={true}
          style={[styles.text, {color: colors.text}]}
          placeholderTextColor={colors.gray}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderRadius: 5,
    ...commonStyles.shadow,
  },
  text: {
    paddingLeft: 20,
    paddingVertical: 10,
    width: '90%',
  },
});

export default CustomTextInput;
