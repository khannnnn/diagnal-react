import { combineReducers } from 'redux';
import firstMoviesList from './FirstMoviesList';

const allReducer = combineReducers({
    firstMoviesList: firstMoviesList
});

export default allReducer;