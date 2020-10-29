import React from 'react'
import { View, Text, FlatList, Button, Alert } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = props => {

   const userProducts = useSelector(state => state.products.userProducts)
   const dispatch = useDispatch()
   
   const editProductHandler = (id) => {
      props.navigation.navigate('EditProduct', {productId: id})
   }

   const deleteHandler = (id) => {
      Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(productsActions.deleteProduct(id));
          }
        }
      ]);
   };  

   if(userProducts.length === 0 ){
      return (
         <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Seems you have no products for sale, tap icon to create</Text>
         </View>
      )
   }

   return (
      <View style={{backgroundColor: 'skyblue', flex:1 }} >
         <FlatList data={userProducts} renderItem={itemData => 
            <ProductItem 
               image={itemData.item.imageUrl} 
               title={itemData.item.title}
               price={itemData.item.price}
               onSelect={() => {editProductHandler(itemData.item.id)}}
            >
               <Button title='Edit Details' onPress={() => {editProductHandler(itemData.item.id)}} />
               {/* <Button title='Delete' onPress={() => {deleteHandler(itemData.item.id)}} /> */}
               <Button title='Delete' onPress={(id) => {deleteHandler(itemData.item.id)}} />
            </ProductItem>
            } 
         />
      </View>
   )   

}

export const UserProductsScreenOptions = navData => {
   return {
      headerTitle: 'My Products',
      headerLeft: () =>  (<HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item
            title="Menu"
            iconName="ios-menu"
            color="#fff"
            onPress={() => {
                  navData.navigation.toggleDrawer()
            }}
         />
      </HeaderButtons>),
      headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
         title="Add"
         iconName="md-create"
         color="#fff"
         onPress={() => {
               navData.navigation.navigate('EditProduct')
         }}
      />
   </HeaderButtons>)
   }   
}

export default UserProductsScreen;