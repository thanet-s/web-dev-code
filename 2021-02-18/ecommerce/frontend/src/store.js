import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailReducer } from './reducers/product.js';
import { userSigninReducer } from './reducers/user.js';
import cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';

const userInfo = cookie.getJSON( 'userInfo' ) || null;

const initialState = { userSignin: { userInfo } };

const reducers = combineReducers({
  productList:   productListReducer,
  productDetail: productDetailReducer,
  userSignin:    userSigninReducer,
  cart: cartReducer,
});

const store = createStore(reducers, initialState, compose(applyMiddleware(thunk)));

export default store;
