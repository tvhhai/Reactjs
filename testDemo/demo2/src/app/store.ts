import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "../redux/reducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // serializableCheck: false,

        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['appAgGrid/saveColumns', 'appAgGrid/saveHideColumns'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
            // Ignore these paths in the state
            ignoredPaths: ['appAgGridSlice.tableConfig'],
        },
    }),
    preloadedState: undefined,
    reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;


// import { applyMiddleware, compose, createStore } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "../redux/reducer";
//
// const composeEnhancers =  compose;
// const store = createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(thunk))
// );
//
// export default store;