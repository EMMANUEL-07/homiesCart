import React, {useState, useEffect, useCallback, useReducer} from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, ActivityIndicator, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products'
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors'
import Input from '../../components/UI/Input'

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


const EditProductScreen = props => {
   const [isLoading, setIsLoading] = useState(false)
   const [isError, setIsError] = useState()

   const prodId = props.route.params ? props.route.params.productId : null ;
   const editedProduct = useSelector(state =>
     state.products.userProducts.find(prod => prod.id === prodId)
   );

   const dispatch = useDispatch()

   const[formState, dispatchFormState ] = useReducer(formReducer, {
      inputValues: {
         title: editedProduct ? editedProduct.title : '',
         imageUrl: editedProduct ? editedProduct.imageUrl : '',
         description: editedProduct ? editedProduct.description : '' ,
         price: ''
      }, 
      inputValidities: {
         title: editedProduct ? true : false,
         imageUrl: editedProduct ? true : false,
         description: editedProduct ? true : false,
         title: editedProduct ? true : false,
      }, 
      formIsValid: editedProduct ? true : false,
   })
 
   /* const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
   const [titleIsValid, setTitleIsValid] = useState(false)
   const [imageUrl, setImageUrl] = useState( editedProduct ? editedProduct.imageUrl : '' );
   const [price, setPrice] = useState('');
   const [description, setDescription] = useState(  editedProduct ? editedProduct.description : ''  ); */
 
   
   useEffect(() => {
      if(isError){
         Alert.alert('An Error Occured', isError, [{text: 'Okay'}] )
      }
   }, [isError])


   const submitHandler = useCallback( async () => {
      if(!formState.formIsValid){
         Alert.alert('Wrong Input!', 'Please check errors in the form',  [{text: 'Okay'}])
         return 
      }

      setIsLoading(true)
      setIsError(null)

      try{
         if(editedProduct){
            await dispatch(productActions.updateProduct(prodId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl)) 
         }else{
            await dispatch(productActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price))
         }
         props.navigation.goBack()
      }catch(err){
         setIsError(err.message)
      }
      
      setIsLoading(false)

      
   }, [dispatch, prodId, formState]);
 
   useEffect(() => {
     props.navigation.setOptions({
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
           <Item
             title="Save"
             iconName='ios-checkmark'
             onPress={submitHandler}
           />
         </HeaderButtons>
       )
     })
   }, [submitHandler]);

   const inputChangeHandler = useCallback((inputField, inputValue, inputValidity) => {
      dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue,  isValid: inputValidity, inputField: inputField }) 
   }, [dispatchFormState])
 

   if(isLoading){
      return(
         <View style={styles.centered}>
            <ActivityIndicator siz='large' color={Colors.primary} />
         </View>
      )
   }

   

   return (
      <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={100} >
         <ScrollView>
            <View style={styles.form}>
               <Input 
                  id='title'
                  label='Title'
                  errorText= 'Please enter a valid title'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue = {editedProduct ? editedProduct.title : ''}
                  initialValidity = {!!editedProduct}
                  required
               />
               <Input 
                  id='imageUrl'
                  label='Image Url'
                  errorText= 'Please enter a valid image url'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue = {editedProduct ? editedProduct.imageUrl : ''}
                  initialValidity = {!!editedProduct}
                  required
               />
               {editedProduct ? null : (
                  <Input 
                  id='price'
                  label='Price'
                  errorText= 'Please enter a valid price'
                  keyboardType= 'decimal-pad'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  required
                  min={0.1}
                  />
               )}
               <Input 
                  id='description'
                  label='Description'
                  errorText= 'Please enter a valid description'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  multiline
                  numberOfLines={3}      
                  onInputChange={inputChangeHandler}
                  initialValue = {editedProduct ? editedProduct.description : ''}
                  initialValidity = {!!editedProduct}
                  required
                  minLength={5}
               />
            </View>
         </ScrollView>
      </KeyboardAvoidingView>   
   )
}

export const EditProductScreenOptions = navData => {
   
   const routeParams = navData.route.params ? navData.route.params : {}
   return {
     headerTitle: routeParams.productId  ? 'Edit Product' : 'Add Product'
   };
};
 

const styles = StyleSheet.create({
   form: {
      margin: 20
   },
   centered: {
      flex:1, 
      justifyContent: 'center',
      alignItems: 'center'
   }
})

export default EditProductScreen