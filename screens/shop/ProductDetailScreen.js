import React from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Image, Dimensions} from 'react-native'
import products from '../../store/reducers/products';
import {useSelector, useDispatch} from 'react-redux'
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props => {

   const productId = props.route.params.productId
   const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
   const dispatch = useDispatch()
   

   return (
      <ScrollView>
         <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
         <View  style={styles.button}><Button title='Add to Cart' onPress={()=> { dispatch(cartActions.addToCart(selectedProduct))}} /></View> 
         <Text  style={styles.price}> ${selectedProduct.price.toFixed(2) } </Text>
         <Text  style={styles.description}> {selectedProduct.description} </Text>         
      </ScrollView>  
   )
}

export const ProductDetailScreenOptions = navData => {
   return {
      headerTitle: navData.route.params.productTitle
   }
}

const styles = StyleSheet.create({ 
   image: {
      width: '100%',
      height: Dimensions.get('window').width > 540 ? 600 : 300 
   },
   button: {
      marginVertical: 10,
      alignItems: 'center'
   },
   price: {
      fontSize: 20,
      color:'#888',
      textAlign: 'center',
      marginVertical: 20
   },
   description: {
      fontSize: 14,
      textAlign: 'center'
   }
})

export default ProductDetailScreen




