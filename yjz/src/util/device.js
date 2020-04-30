import { Dimensions } from 'react-native';

const deviceParam = Dimensions.get('window');


export const DEVICE_WIDTH = deviceParam.width;

export const DEVICE_HEIGHT = deviceParam.height;

export const DEVICE_SCALE = deviceParam.scale;

export default DEVICE_WIDTH;
