import { combineReducers } from 'redux';
import DashboardReducer from '../Screens/Dashboard/reducer';

const appReducer = combineReducers({
        dashboard : DashboardReducer
});

export default appReducer;
