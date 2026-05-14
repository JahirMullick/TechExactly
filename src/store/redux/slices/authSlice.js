"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authActions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    user: null,
    session: null,
};
var authSlice = (0, toolkit_1.createSlice)({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        setUser: function (state, action) {
            var _a;
            state.user = action.payload.user;
            state.session = (_a = action.payload.session) !== null && _a !== void 0 ? _a : null;
        },
        clearUser: function (state) {
            state.user = null;
            state.session = null;
        },
    },
});
exports.authActions = authSlice.actions;
exports.default = authSlice;
