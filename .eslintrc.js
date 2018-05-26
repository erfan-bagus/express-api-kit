module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "indent": ["error", "tab"],
        "no-tabs": 0,
        "keyword-spacing": [2, {"overrides": {"if": {"after": false}}}],
        "no-console": ["error", {"allow": ["log"]}],
        "comma-dangle": ["error", "never"]
    }
};
