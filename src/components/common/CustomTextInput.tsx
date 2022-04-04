// import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useCallback, useState } from 'react';
import { TextInput, TextInputProps, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';

interface IProps {
  secureTextEntry?: boolean;
}

const CustomTextInput = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TextInput> &
    Readonly<TextInputProps> &
    Readonly<{ children?: React.ReactNode }> &
    IProps
) => {
  const [inputFocus, setInputFocus] = useState({
    borderColor: colors.white,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState<'eye' | 'eye-slash'>('eye');

  const { secureTextEntry } = props;

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
      borderColor: colors.white,
    });
  }, []);

  return (
    <View style={[styles.container, inputFocus]}>
      {secureTextEntry ? (
        <>
          <TextInput
            {...props}
            style={styles.text}
            placeholderTextColor={colors.gray}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            secureTextEntry={passwordVisibility}
          />
          <TouchableOpacity onPress={handlePasswordVisibility}>
            <Icon name={rightIcon} size={22} color={colors.primaryDark} />
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          {...props}
          editable={true}
          style={styles.text}
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
    backgroundColor: colors.white,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    paddingLeft: 20,
    paddingVertical: 10,
    width: '90%',
    color: colors.black,
  },
});

export default CustomTextInput;