/* eslint-disable no-param-reassign */
import {
    DEVICE_SCALE
} from './device';

export default (url, thumbnail) => {
    if (!url || typeof url !== 'string') return url;
    url += '?imageView';
    let [width, height] = thumbnail.split('x');
    width = Math.round(width * DEVICE_SCALE);
    height = Math.round(height * DEVICE_SCALE);
    // if (!height) {
    //     thumbnail = `${width}x0`;
    // } else if (!width) {
    //     thumbnail = `0x${height}`;
    // } else {
    //     thumbnail = `${width}x${height}`;
    // }
    if (thumbnail) url += `&thumbnail=${width}x${height}`;
    return url;
};
