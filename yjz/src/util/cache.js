/* eslint-disable consistent-return */
import { AsyncStorage } from 'react-native';

export default {
    async getDataFromStorage(key) {
        try {
            const data = await AsyncStorage.getItem(key);
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    },
    saveDataFromStorage(key, value) {
        try {
            AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    },

    // 读取用户数据
    async getUserInfoFromStorage() {
        try {
            const value = await AsyncStorage.getItem('__USER_INFO__');
            return JSON.parse(value);
        } catch (error) {
            console.log(error);
        }
    },
    // 写入用户数据
    saveUserInfoFromStorage(value) {
        try {
            AsyncStorage.setItem('__USER_INFO__', JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }
};
