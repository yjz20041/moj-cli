/* eslint-disable arrow-body-style */
import RPC from './rpc';


export default (param) => {
    return RPC.showImagePicker(param).then((res) => {
        return {
            ...res,
            url: res.url || res.remoteUrl,
            nosKey: res.nosKey
            // nosKey: 'yyimgs/a0c8/68c4/687d/d2af60cf94d475c0156b23ac287bd27b.png'
        };
    }).catch((e) => {
        // if (e && e.Code !== 301) {
        //     RPC.showToast({
        //         text: '上传失败，请重试'
        //     });
        //     throw e;
        // }
        throw e;
    });
};
