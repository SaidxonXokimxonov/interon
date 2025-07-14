import {configureStore} from '@reduxjs/toolkit'
import tests from './reducers/tests'
import user from './reducers/user'
import results from './reducers/results'

const store = configureStore({
    reducer: {
        tests,
        results,
        user
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store

