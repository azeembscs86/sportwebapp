module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "import/no-unresolved": "off"
  }
};
