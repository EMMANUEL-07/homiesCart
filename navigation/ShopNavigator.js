import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import {SafeAreaView, Button, View} from 'react-native'
import {useDispatch} from 'react-redux'


//import { createBottomTabNavigator } from 'react-navigation-tabs'

import ProductsOverviewScreen, {ProductOverviewscreenOptions} from '../screens/shop/ProductsOverview'
import ProductDetailScreen, {ProductDetailScreenOptions} from '../screens/shop/ProductDetailScreen'
import CartScreen, {CartScreenOptions} from '../screens/shop/CartScreen'
import OrdersScreen, {OrdersScreenOptions} from '../screens/shop/OrdersScreen'
import UserProductsScreen, {UserProductsScreenOptions} from '../screens/user/UserProductsScreen'
import EditProductScreen, {EditProductScreenOptions} from '../screens/user/EditProductScreen'
import AuthScreen, {AuthScreenOptions} from '../screens/user/AuthScreen'
import StartupScreen from '../screens/user/StartupScreen'
import {Ionicons} from '@expo/vector-icons'
import * as authActions from '../store/actions/auth'

import Colors from '../constants/Colors'
 
const defaultNavOptions = {
   headerStyle: {
      backgroundColor: Colors.primary
   },
   headerTintColor: 'white'
}

const ProductsStackNavigator = createStackNavigator()
const OrdersStackNavigator = createStackNavigator()
const AdminStackNavigator = createStackNavigator()
const AuthStackNavigator = createStackNavigator()
const ShopDrawerNavigator = createDrawerNavigator()

const ProductsNavigator = () => {

   return (
      <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions} >
         <ProductsStackNavigator.Screen 
            name='ProductsOverview' 
            component={ProductsOverviewScreen} 
            options = {ProductOverviewscreenOptions}
         />
         <ProductsStackNavigator.Screen 
            name='ProductDetail' 
            component={ProductDetailScreen}
            options={ProductDetailScreenOptions} 
         />
         <ProductsStackNavigator.Screen 
            name='Cart' 
            component={CartScreen}
            options={CartScreenOptions} 
         />
      </ProductsStackNavigator.Navigator>
   )
}

const OrdersNavigator = () => {

   return (
      <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions} >
         <OrdersStackNavigator.Screen 
            name='Orders' 
            component={OrdersScreen} 
            options = {OrdersScreenOptions}
         />
      </OrdersStackNavigator.Navigator>
   )
}

export const AdminNavigator = () =>{
   return (
      <AdminStackNavigator.Navigator screenOptions={defaultNavOptions} >
         <AdminStackNavigator.Screen 
            name='UserProducts' 
            component={UserProductsScreen} 
            options = {UserProductsScreenOptions}
         />
         <AdminStackNavigator.Screen 
            name='EditProduct' 
            component={EditProductScreen}
            options={EditProductScreenOptions} 
         />
      </AdminStackNavigator.Navigator>
   )
}

export const AuthNavigator = () => {

   return (
      <AuthStackNavigator.Navigator screenOptions={defaultNavOptions} >
         <AuthStackNavigator.Screen 
            name='Auth' 
            component={AuthScreen} 
            options = {AuthScreenOptions}
         />
      </AuthStackNavigator.Navigator>
   )
}


export const ShopNavigator = () => {
   const dispatch = useDispatch();
 
   return (
      <ShopDrawerNavigator.Navigator
         drawerContent={props => {
         return (
            <View style={{ flex: 1, paddingTop: 20 }}>
               <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
               <DrawerItemList {...props} />
               <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {
                     dispatch(authActions.logout());
                     // props.navigation.navigate('Auth');
                  }}
               />
               </SafeAreaView>
            </View>
         );
         }}
         drawerContentOptions={{
         activeTintColor: Colors.primary
         }}
      >
         <ShopDrawerNavigator.Screen
         name="Products"
         component={ProductsNavigator}
         options={{
            drawerIcon: props => (
               <Ionicons
               name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
               size={23}
               color={props.color}
               />
            )
         }}
         />
         <ShopDrawerNavigator.Screen
         name="Orders"
         component={OrdersNavigator}
         options={{
            drawerIcon: props => (
               <Ionicons
               name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
               size={23}
               color={props.color}
               />
            )
         }}
         />
         <ShopDrawerNavigator.Screen
         name="Admin"
         component={AdminNavigator}
         options={{
            drawerIcon: props => (
               <Ionicons
               name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
               size={23}
               color={props.color}
               />
            )
         }}
         />
      </ShopDrawerNavigator.Navigator>
   );
};
 
/* const ProductsNavigator = createStackNavigator({
   ProductsOverview: ProductsOverviewScreen,
   ProductDetail: ProductDetailScreen,
   Cart: CartScreen
},{
   navigationOptions: {
      drawerIcon: drawerConfig => <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor}  />
   },
   defaultNavigationOptions: defaultNavOptions
})
 */

/* const OrdersNavigation = createStackNavigator({
   Orders: OrdersScreen
},{
   navigationOptions: {
      drawerIcon: drawerConfig => <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} />
   },
   defaultNavigationOptions: defaultNavOptions
})

const AdminNavigation = createStackNavigator({
   UserProducts: UserProductsScreen,
   EditProduct: EditProductScreen
},{
   navigationOptions: {
      drawerIcon: drawerConfig => <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
   },
   defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
   Products: ProductsNavigator,
   Orders: OrdersNavigation,
   Admin: AdminNavigation
},{
   contentOptions: {
      activeTintColor: Colors.primary
   },
   contentComponent : props => {
      const dispatch = useDispatch()
      return (
      <View style={{flex: 1, paddingTop: 20}}>
         <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <Button title='Logout' color={Colors.primary} onPress={() => {
               dispatch(authActions.logout())
               //props.navigation.navigate('Auth')
               }} />
         </SafeAreaView>
      </View>
      )

   }
})

const AuthNavigator = createStackNavigator({
   Auth: AuthScreen
},{
   
   defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
   Startup: StartupScreen,
   Auth: AuthNavigator ,
   Shop: ShopNavigator
})

export default createAppContainer(MainNavigator) */