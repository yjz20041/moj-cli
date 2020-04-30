import { Dimensions } from 'react-native';
import {
    uiConfig
} from '@config/app.config';

const deviceWidthDp = Dimensions.get('window').width;

const uiWidthDp = uiConfig.width;

function flex(uiElementDp) {
    return ~~(uiElementDp * deviceWidthDp / uiWidthDp);
}

export default flex;
