import {AsyncStorage } from 'react-native'

export const SIGNUP = 'SIGNUP'
export const LOGOUT  = 'LOGOUT'
export const AUTHENTICATE  = 'AUTHENTICATE'
export const SET_DID_TRY_AL  = 'SET_DID_TRY_AL'


let timer;

export const setDidTryAL = () => {
   return {
      type: SET_DID_TRY_AL
   }
}

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};



export const signup = (email, password) => {
   
   return async dispatch => {

      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2MlrC2LBqjIoa-QlLndT-mx0VztMj7ss',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email,
               password,
               returnSecureToken: true
            })
         }
      )

      if(!response.ok){
         const errorResData = await response.json()
         const errorId = errorResData.error.message
         let message = 'Something Went Wrong'
         if(errorId === 'EMAIL_EXIST'){
            message = 'This Email exists already'
         }

         throw new Error (message)
      }

      const resData = await response.json()

      dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000 ))
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
      saveDataToStorage(resData.idToken, resData.localId, expirationDate)
   }

}

export const login = (email, password) => {
   
   return async dispatch => {

      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2MlrC2LBqjIoa-QlLndT-mx0VztMj7ss',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email,
               password,
               returnSecureToken: true
            })
         }
      )

      if(!response.ok){
         const errorResData = await response.json()
         const errorId = errorResData.error.message
         let message = 'Something Went Wrong'
         if(errorId === 'EMAIL_NOT_FOUND'){
            message = 'This Email could not be found!'
         }else if(errorId === 'INVALID_PASSWORD'){
            message = 'This password seems wrong'
         }

         throw new Error (message)
      }

      const resData = await response.json()


      dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
      saveDataToStorage(resData.idToken, resData.localId, expirationDate)
   }

}


export const logout = () => {
   clearLogoutTimer();
   AsyncStorage.removeItem('userData');
   return { type: LOGOUT };
};
 
const clearLogoutTimer = () => {
   if (timer) {
     clearTimeout(timer);
   }
};

const setLogoutTimer = expirationTime => {
return dispatch => {
   timer = setTimeout(() => {
      dispatch(logout());
   }, expirationTime);
 };
};

const saveDataToStorage = (token, userId, expirationDate) => {
AsyncStorage.setItem(
   'userData',
   JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
   })
 );
};