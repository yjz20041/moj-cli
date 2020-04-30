import Fetch from '@util/fetch';

const URL = {
    TEST: 'http://nei.hz.netease.com/api/apimock-v2/a131a749be500664711c4b0413f64e54/api/btfish/backend/obb/video/list',
};

export const test = param => Fetch(URL.TEST, {
    data: param
});

export default {};
