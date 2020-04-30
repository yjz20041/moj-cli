module.exports = {
  sourceType: 'unambiguous',
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
  ]
};
