import React, {useState, useReducer, useCallback, useEffect} from 'react'
import {ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Button, ActivityIndicator, Alert} from 'react-native'
//import {LinearGradient} from 'expo-linear-gradient'
import {useDispatch} from 'react-redux'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE' 

const formReducer = (state, action) => {
   if(action.type === FORM_INPUT_UPDATE ){
      const updatedValues = {
         ...state.inputValues,
         [action.inputField]: action.value
      }
      const updatedValidities = {
         ...state.inputValidities,
         [action.inputField]: action.isValid
      }
      let updatedFormIsValid =  true;
      for(const key in updatedValidities){
         updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
      }
      return {
         ...state,
         inputValues: updatedValues,
         inputValidities: updatedValidities,
         formIsValid: updatedFormIsValid
      }
   }
   return state
}


const AuthScreen = props => {

   const [isLoading, setIsLoading] = useState(false)
   const [isError, setIsError] = useState()
   const [isSignUp, setIsSignUp] = useState(false)


   const dispatch = useDispatch()

   const AuthHandler = async () => {
      let action;
      if(isSignUp){
         action = authActions.signup(formState.inputValues.email, formState.inputValues.password)
      }else {
         action = authActions.login(formState.inputValues.email, formState.inputValues.password)
      }
      setIsLoading(true)
      setIsError(null)
      try{
         await dispatch(action)
         //props.navigation.navigate('Shop')
      }catch(e){
         setIsError(e.message)
         setIsLoading(false)
      }
      
   }

   const inputChangeHandler = useCallback((inputField, inputValue, inputValidity) => {
      dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue,  isValid: inputValidity, inputField: inputField }) 
   }, [dispatchFormState])

   const[formState, dispatchFormState ] = useReducer(formReducer, {
      inputValues: {
         email: '',
         password: ''
      }, 
      inputValidities: {
         email: '',
         password: ''
      }, 
      formIsValid:  false
   })

   useEffect(() => {
      if(isError) {
         Alert.alert('An Error occured', isError, [{text: 'Okay'}])
      }
   })

   return (
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={0} style={styles.screen}   >
      <View style={styles.bg}> 
      <Card style={styles.authContainer}>
         <ScrollView>
            <Input 
               id='email' 
               label='E-Mail' 
               keyboardType='email-address' 
               required 
               email 
               autoCapitalize='none' 
               errorText='Please enter a valid email address' 
               onInputChange={inputChangeHandler}
               returnKeyType='next'
               initialValue=''
            />
            <Input 
               id='password' 
               label='Password' 
               keyboardType='default' 
               secureTextEntry
               required 
               minLength={5} 
               autoCapitalize='none' 
               errorText='Please enter a valid password' 
               onInputChange={inputChangeHandler}
               initialValue=''
            />
            <View style={styles.buttonContainer}>
               {isLoading ? <ActivityIndicator size='small' color={Colors.primary} /> : <Button 
               title={isSignUp ? 'SignUp' :'Login'  }
               color={Colors.primary} 
               onPress={AuthHandler} /> }
            </View>
            <View style={styles.buttonContainer}><Button 
               title={!isSignUp ? 'Switch To Sign Up'  : 'Switch To Log In'    }
               color={Colors.accent} 
               onPress={()=>{
                  setIsSignUp(prevState => !prevState)
               }} />
            </View>
         </ScrollView>  
      </Card>
      </View>
      </KeyboardAvoidingView>
   )
}

export const AuthScreenOptions = {
   headerTitle: 'Authenticate',

}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: '#39bcc0'
      
   },
   bg:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#39bcc0'
   },
   authContainer: {
      width: '80%',
      maxWidth: 400,
      maxHeight: 400,
      padding: 20
   },
   buttonContainer: {
      marginTop: 10
   }
})

export default AuthScreen