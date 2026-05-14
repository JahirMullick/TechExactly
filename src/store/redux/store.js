"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
// import themeReducer from '@/model/theme/themeSlice';
var redux_logger_1 = require("redux-logger");
var authSlice_1 = require("./slices/authSlice");
var userSlice_1 = require("./slices/userSlice");
var themeSlice_1 = require("../../theme/theme/themeSlice");
var appReducer = (0, toolkit_1.combineReducers)({
    theme: themeSlice_1.themeSlice.reducer,
    authReducer: authSlice_1.default.reducer,
    userReducer: userSlice_1.default.reducer
});
var rootReducer = function (state, action) {
    // Don't reassign state - return directly
    if (action.type === 'resetRedux/resetReduxState') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};
exports.store = (0, toolkit_1.configureStore)({
    reducer: rootReducer,
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(redux_logger_1.default);
    },
});
