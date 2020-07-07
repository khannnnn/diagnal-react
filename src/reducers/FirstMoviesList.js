const firstMoviesList = (state = [], action) => {
    switch (action.type) {
        case "FIRSTMOVIESLIST":
            return action.payload;
        default:
            return state;
    }
}

export default firstMoviesList;