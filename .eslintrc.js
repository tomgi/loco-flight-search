module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true,
    "cypress/globals": true
  },
  "extends": ["airbnb-base", "plugin:vue/recommended"],
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
  },
  "plugins": ["jest", "cypress"],
  "overrides": [{
    "files": ["server/**/*.js"],
    "rules": {
      "no-console": 0 // allow use of console in the backend code
    }
  }, {
    "files": ["assets/**/*"],
    "rules": {
      "import/no-extraneous-dependencies": ["error", {
        // allowing frontend code to access devDependencies
        // following convention proposed in https://github.com/webpack/webpack/issues/520#issuecomment-174011824
        "devDependencies": true
      }]
    }
  }, {
    "files": ["test/**/*.js"],
    "rules": {
      "global-require": 0
    }
  }]
};
