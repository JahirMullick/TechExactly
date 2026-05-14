"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userActions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
// 3. Set the initial state
var initialState = {
    user: null,
};
// 4. Create the slice
var userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserDetails: function (state, action) {
            state.user = action.payload;
        },
        clearUserDetails: function (state) {
            state.user = null;
        },
    },
});
// 5. Export actions and reducer
exports.userActions = userSlice.actions;
exports.default = userSlice;
