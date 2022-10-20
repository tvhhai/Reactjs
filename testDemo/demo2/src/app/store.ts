import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "../redux/reducer";

const store = configureStore({
    middleware: undefined,
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