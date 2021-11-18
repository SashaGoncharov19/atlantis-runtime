let initialState = {
    contentName: 'Выберите сервер',
    connectionIP: '',
    connectionPORT: '',
    pageReload: false
}
const mainReducer = (state = initialState, action) => {

    const actionType = action.type;
    switch (actionType) {
        case 'mainContentName':
            return {
                ...state,
                contentName: action.name,
                connectionIP: action.ip,
                connectionPORT: action.port
            }
        default:
            return state;

    }
}

export default mainReducer;