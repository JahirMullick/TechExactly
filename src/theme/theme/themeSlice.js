"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTheme = exports.updateTheme = exports.themeSlice = exports.ThemeType = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var ThemeType;
(function (ThemeType) {
    ThemeType["LIGHT"] = "LIGHT";
    ThemeType["DARK"] = "DARK";
})(ThemeType || (exports.ThemeType = ThemeType = {}));
// Define the initial state using that type
var initialState = {
    themePreference: ThemeType.LIGHT,
};
exports.themeSlice = (0, toolkit_1.createSlice)({
    name: 'theme',
    initialState: initialState,
    reducers: {
        updateTheme: function (state, action) {
            if (state.themePreference !== action.payload) {
                state.themePreference = action.payload;
            }
        },
    },
});
exports.updateTheme = exports.themeSlice.actions.updateTheme;
var selectTheme = function (state) { return state.theme.themePreference; };
exports.selectTheme = selectTheme;
exports.default = exports.themeSlice;
