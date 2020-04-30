import {
    combineReducers, createStore, applyMiddleware, bindActionCreators
} from 'redux';
import { connect } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

/**  引入reducer和action START */
import home, { actions as actionsHome } from './home';

const combinedActions = {
    home: actionsHome,
    profile: actionsProfile
};

const combinedReducers = {
    home,
};
/**  引入reducer和action END */

const middlewares = [promiseMiddleware()];

if (process.env.NODE_ENV === 'development') {
    // const { logger } = require('redux-logger');

    // middlewares.push(logger);
}

export const connectByModule = (moduleName, mapStateToProps, mapDispatchToProps) => {
    const mapDispatchToPropsWrap = (dispatch) => {
        let actions = {};
        Object.keys(combinedActions).some((key) => {
            const item = combinedActions[key];
            if (moduleName && key === moduleName) {
                actions = bindActionCreators(item, dispatch);
                return true;
            }
            actions[key] = bindActionCreators(item, dispatch);
            return false;
        });

        return {
            actions,
            ...mapDispatchToProps
        };
    };
    return target => connect(mapStateToProps, mapDispatchToPropsWrap)(target);
};


const store = createStore(combineReducers(combinedReducers), applyMiddleware(...middlewares));
export default store;

export const withRedux = fn => props => fn(props, store);
