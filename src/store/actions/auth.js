import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
   return {
      type : actionTypes.AUTH_START
   };
};

export const authSuccess = (idToken, userId) => {
   return {
      type    : actionTypes.AUTH_SUCCESS,
      idToken,
      userId
   };
};

export const authFail = (error) => {
   return {
      type  : actionTypes.AUTH_FAIL,
      error : error
   };
};

export const logout = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('expirationDate');
   localStorage.removeItem('userId');
   return {
      type : actionTypes.AUTH_LOGOUT
   };
};

export const checkAuthTimeout = (expirationDate) => {
   return (dispatch) => {
      setTimeout(() => {
         dispatch(logout());
      }, parseInt(expirationDate) * 1000);
   };
};

export const auth = (email, password, isSignUp) => {
   return (dispatch) => {
      dispatch(authStart());
      const authData = {
         email,
         password,
         returnSecureToken : true
      };
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDXIRm80bo9egjio1GNgWHT2_vq-dby-g';
      if (!isSignUp) {
         url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDXIRm80bo9egjio1GNgWHT2_vq-dby-g';
      }

      axios
         .post(url, authData)
         .then((response) => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
         })
         .catch((err) => {
            dispatch(authFail(err.response.data.error));
         });
   };
};

export const setAuthRedirectPath = (path) => {
   return {
      type : actionTypes.SET_AUTH_REDIRECT_PATH,
      path : path
   };
};

export const authCheckState = () => {
   return (dispatch) => {
      const token = localStorage.getItem('token');
      if (!token) {
         return dispatch(logout());
      } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
         if (expirationDate > new Date()) {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
         } else dispatch(logout());
      }
   };
};
