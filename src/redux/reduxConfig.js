import { createStore, applyMiddleware,combineReducers} from 'redux'
import rootReducer from './reducer/RootReducer'
export default function configure(initState){
    const store = createStore(
        rootReducer,//rootReducer,
        initState
    )
    return store
}