import React, {useEffect, useState} from 'react'
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from  '../../store/actions/orders'
import Colors from '../../constants/Colors'
import Order from '../../models/orders';

const OrdersScreen = props => {

   const orders = useSelector(state => state.orders.orders)
   const [isLoading, setIsLoading] = useState(false)
   const dispatch = useDispatch()

   useEffect(()=> {
      setIsLoading(true)
      dispatch(ordersActions.fetchOrders()).then(()=> setIsLoading(false))
      
   },[])

   if(isLoading){
      return(
         <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
         </View>
      )
   }

   if(orders.length === 0 ){
      return (
         <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> No order found, maybe start ordering some. </Text>
         </View>
      )
   }

   return (
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} /> }
      />
   );


}

export const OrdersScreenOptions = navData => {

   return {
      headerTitle: 'My Orders',
      headerLeft: () => (
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
               title="Menu"
               iconName="ios-menu"
               color="#fff"
               onPress={() => {
                     navData.navigation.toggleDrawer()
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
   }
})

export default OrdersScreen
