import { Platform } from 'react-native';

const {
    OS
} = Platform;

export const IS_IOS = OS === 'ios';

export const IS_ANDROID = OS === 'android';

export default Platform;
