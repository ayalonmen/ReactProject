const defaultState = {
    appName:'Conduit',
    token:null
}

export default (state = defaultState,action) => {
    switch(action.type) {
        case 'APP_LOAD': {
            console.log('Common Reducer - action recived',action)
            return ({
                ...state,
                token:action.token || null,
                appLoaded:true,
                currentUser:action.payload ? action.payload.user : null

            })
        }
        case 'REDIRECT': {
            return{...state,redirectTo:null}
        }
        case 'LOGIN':{
            console.log('this reducer common')
            return {
                ...state,
                redirectTo:action.error ? null : '/',
                token:action.error ? null : action.payload.user.token,
                currentUser:action.error ? null : action.payload.user
            }
        }
        case 'LOGOUT':{
            return{
                ...state,
                redirectTo:'login',
                currentUser:null,
                token:null
            }
        }
        case 'REGISTER':{
            return {
                ...state,
                redirectTo:action.error ? null : '/',
                token:action.error ? null : action.payload.user.token,
                currentUser:action.error ? null : action.payload.user
            }
        }
        case 'SETTINGS_SAVED':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            };
        case 'DELETE_ARTICLE':
            return { ...state, redirectTo: '/' };
    }
    return state;
};