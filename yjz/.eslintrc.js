module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "globals": {
    "__env": false
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalDecorators": true
    }
  },
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "15.0",
      "flowVersion": "0.53"
    },
    "propWrapperFunctions": [ "forbidExtraProps" ]
  },
  "rules": {
    "indent": [
      "error",
      4,
      {
        "VariableDeclarator": {
          "var": 2,
          "let": 2,
          "const": 3
        },
        "SwitchCase": 1
      }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "no-empty": [
      "error",
      {
        "allowEmptyCatch": true
      }
    ],
    "no-unused-vars": [
      "error",
      {
        "args": "none",
        "caughtErrors": "none"
      }
    ],
    "max-len": [
      "error",
      10000
    ],
    "react/prop-types": [2, { "ignore": ["children", "match"]}],
    "no-console": "off",
    "no-debugger": 0,
    "semi": "off",
    "eol-last": "off",
    "no-multiple-empty-lines": ["off", { "max": 1, "maxEOF": 0 }]
  }
}
