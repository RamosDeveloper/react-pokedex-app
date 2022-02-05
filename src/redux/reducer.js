const initialState = {
    userName: "",
    pokemonsPerPage: 4,
    currentPage: 1,
    theme: "light"
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "@userName/set": {
            return {
                ...state,
                userName: action.payload
            }
        }

        case "@pages/setCurrentPage": {
            return {
                ...state,
                currentPage: action.payload
            }
        }

        case "@pages/setPokemonsPerPage": {
            return {
                ...state,
                pokemonsPerPage: action.payload
            }
        }

        case "@theme/set": {
            return {
                ...state,
                theme: action.payload
            }
        }
    }

    return state;
}

export default reducer;