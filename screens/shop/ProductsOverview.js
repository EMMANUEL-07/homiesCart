import React, {useState, useEffect, useCallback} from 'react'
import {FlatList, View, StyleSheet, Text, Platform, Button, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'


const ProductsOverviewScreen = props => {

   const [isLoading, setIsLoading] = useState(false)
   const [isRefreshing, setIsRefreshing] = useState(false)
   const [isError, setIsError] = useState()
   const products = useSelector(state => state.products.availableProducts)
   const dispatch = useDispatch()

   const loadProducts = useCallback(async () => {
      setIsError(null)
      setIsRefreshing(true)
      try{
         await dispatch(productsActions.fetchProducts())
      }catch(err){
         setIsError(err.message)
      }
      setIsRefreshing(false)
   }, [dispatch, setIsError, setIsLoading])

   useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', loadProducts)
      return () => {
         unsubscribe()
      }
   }, [loadProducts])

   useEffect(() => {
      setIsLoading(true)
      loadProducts().then(() => {setIsLoading(false)} )
      
   }, [dispatch, loadProducts])

   const selectItemHandler = (id, title) => {
      props.navigation.navigate('ProductDetail', { 
         productId: id, 
         productTitle: title 
      })
   }

   if(isLoading){
      return(
         <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
         </View>
      )
   }

   if(!isLoading && products.length === 0){
      return(
         <View style={styles.centered}>
            <Text>No Products found, Maybe start adding some!</Text>
         </View>
      )
   }

   if(isError){
      return(
         <View style={styles.centered}>
            <Text>An error occured</Text>
            <Button title='Try Again'  onPress={loadProducts}  color={Colors.primary} />
         </View>
      )
   }

   return (
      <View style={styles.bg}>
         <FlatList 

         onRefresh={loadProducts}
         refreshing={isRefreshing}
         data={products} 
         renderItem={itemData => <ProductItem 
            image={itemData.item.imageUrl} 
            title={itemData.item.title} 
            price={itemData.item.price}  
            onSelect={()=> {selectItemHandler(itemData.item.id, itemData.item.title)}} 
            > 
               <Button title='View Details' onPress={()=> {selectItemHandler(itemData.item.id, itemData.item.title)}} />
               <Button title='Add To Cart' onPress={()=> {dispatch(cartActions.addToCart(itemData.item))}} />
            </ProductItem>  
         } 
         />
      </View>
   )
}


export const ProductOverviewscreenOptions = navData => {

   return {
      headerTitle: 'All Products',
      headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
               title="Menu"
               iconName="ios-menu"
               color="#fff"
               onPress={() => {
                     navData.navigation.toggleDrawer()
               }}
            />
         </HeaderButtons>),
      headerRight: () => (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
           <Item
             title="Cart"
             iconName="ios-cart"
             color="#fff"
             onPress={() => {
                 navData.navigation.navigate('Cart')
             }}
            />
         </HeaderButtons>
      )
   }
}

const styles = StyleSheet.create({
   centered: {
      flex:1, 
      justifyContent: 'center',
      alignItems: 'center'
   },
   bg: {
      backgroundColor: 'skyblue',
      flex:1, 
   }
})

export default ProductsOverviewScreen