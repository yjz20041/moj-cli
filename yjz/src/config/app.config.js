module.exports = {
    proxyConfig: [{
        context: ['/weapi', '/api'],
        target: '',
        // 鉴权
        cookie: ''
    }],
    uiConfig: {
        width: 375
    }
};
