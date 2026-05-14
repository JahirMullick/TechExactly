"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
var store_1 = require("../../store");
var themeSlice_1 = require("./themeSlice");
var useTheme = function () {
    var defaultTheme = (0, store_1.useAppSelector)(function (state) { return state.theme.themePreference; });
    var dispatch = (0, store_1.useAppDispatch)();
    var getCurrentTheme = function () {
        return defaultTheme;
    };
    var changeTheme = function (theme) {
        dispatch((0, themeSlice_1.updateTheme)(theme));
    };
    return { changeTheme: changeTheme, getCurrentTheme: getCurrentTheme };
};
exports.useTheme = useTheme;
