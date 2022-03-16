import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/actions/users';
import { RootState } from '../../redux/reducers/reducer';

const LogOut = () => {

    const dispath = useDispatch()

    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn)

    return (
        <View>
            <Text>{isLoggedIn}</Text>
            <Text>LogOut</Text>
            <Button title='Log Out' onPress={() => dispath(logOutUser())}></Button>
        </View>    
    );
}

const styles = StyleSheet.create({
    
})

export default LogOut;