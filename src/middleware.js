import agent from './agent';

const promiseMiddleware = store => next => action => {
    //checking if the payload is a promise (http)
    // if yes we ill dispatch a new action entirely
    // if no we will pass the action to the next chain - the reducer
    if (isPromise(action.payload)) {
        store.dispatch({ type: 'ASYNC_START', subtype: action.type });
        action.payload.then(
            res => {
                console.log('Found promise payload')
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );

        return;
    }

    // the next function is how you pass contorl to the next piece of middleware in the chain.
    // this case it will trigger the reducer.
    next(action);
};

//somthing is a promise if the contain the 'then' as a function.
function isPromise(v) {
    return v && typeof v.then === 'function';
}


const localStorageMiddleware = store => next => action =>{
    if(action.type === 'REGISTER' || action.type === 'LOGIN') {
        if(!action.error) {
            window.localStorage.setItem('jwt',action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if(action.type === 'LOGOUT') {
        window.localStorage.setItem('jwt', '');
        agent.setToken = null;
    }

    next(action);
}

export {
    promiseMiddleware,
    localStorageMiddleware
};