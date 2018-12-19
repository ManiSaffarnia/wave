const userDefaultState = {

};

const userReducer = (state = userDefaultState, action) => {
    switch (action.type) {
        case 'TEST':
            return ({
                ...state
            });
        default:
            return state;
    }
};//end reducer

export default userReducer;