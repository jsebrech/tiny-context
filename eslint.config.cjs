/* eslint-disable no-undef */
const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    js.configs.recommended, 
    {
        languageOptions: {
            globals: {
                ...globals.browser
            },
            ecmaVersion: 2022,
            sourceType: "module",
        }
    }
];