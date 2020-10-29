import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native'



const ProductItem = props => {

   return (
      <TouchableOpacity onPress ={props.onSelect} >
      <View style={styles.product}>
         <View style={styles.imageContainer}><Image  style={styles.image} source={{ uri: props.image }} /></View>
         <Text style={styles.title}> {props.title} </Text>
         <Text style={styles.price}> ${props.price.toFixed(2)} </Text>
         <View style={styles.button}>
            {props.children}
         </View>
      </View>
      </TouchableOpacity>
   )

}

const styles = StyleSheet.create({
   product: {
      elevation: 5,
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 20,
      height: Dimensions.get('window').width > 540 ? 600 :300 
   },
   imageContainer: {
      width: '100%',
      height: '80%',
      overflow: 'hidden',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
   },
   image:{
      width: '100%',
      height: '100%',
      
   }, 
   title: {
      fontSize: 22,
      marginVertical: 4,
      fontWeight: 'bold'
   },
   price: {
      fontSize: 18,
      color: '#888'
   },
   button: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
   }
})

export default ProductItem;