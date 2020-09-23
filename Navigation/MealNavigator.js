import {createStackNavigator, } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import React from 'react';
import {Platform, Text} from 'react-native';
import Colors from '../constants/Colors';
import CategoryScreen from '../Screens/CategoryScreen';
import CategoryMealScreen from '../Screens/CategoryMealScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer'

import FavouriteScreen from '../Screens/FavouritesScreen';
import FiltersScreen from '../Screens/FiltersScreen';




const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '#ffffff'
    },
    headerTitleStyle: {
        fontFamily: 'opan-sans-bold',
    },
    headerBackTitleStyle: {      // not applicable on android since it doesnt have back text
        fontFamily: 'opan-sans-bold'
    },
    headerTintColor: Platform.OS === 'android' ? '#ffffff' : Colors.primaryColor
}

const MealNavigator = createStackNavigator({
    Categories: CategoryScreen,
    CategoryMeal: {
        screen: CategoryMealScreen
    },
    MealDetail: MealDetailScreen

}, {
    mode: 'modal',
    initialRouteName: 'Categories',
    defaultNavigationOptions: defaultNavigationOptions
})


const FavouriteNavigator = createStackNavigator({ 
    Favourite: FavouriteScreen,
    MealDetail: MealDetailScreen
},
{
    mode: 'modal',
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultNavigationOptions
})

// tabinfo basically gives a lot of properties, one of it is activeTintColor as tintColor of tabBarOptions. 
//So we directly use it
const tabScreenConfig = {
    Meals: {
        screen: MealNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name = 'ios-restaurant' size = {25} color = {tabInfo.tintColor}/>
            },
            tabBarColor: Colors.secondaryColor,    // Only for android and working with shifting true
            tabBarLabel: Platform.OS === 'android' ? <Text style = {{fontFamily: 'opan-sans-bold'}}>Meals</Text>: 'Meals'
        },
    },
    Favourites: {
        screen: FavouriteNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name = 'ios-star' size = {25} color = {tabInfo.tintColor}/>
            },
            tabBarColor: Colors.primaryColor,    // Only for android
            tabBarLabel: 'Favourites!'
        }
    
    }
}


const MealsFavTabNavigator = Platform.OS === 'android' ? 
createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true,
    // barStyle: {             // If you want to change bottom tab color in creatematerialbottomtabnavigator without shifting = true
    //     backgroundColor: Colors.secondaryColor // then use barStyle
    // }

    //MaterialBottomTabNavigator has no properties for styling the text itself. So we add tabBarLabel in tabScreenConfig for a work around
}) : 
createBottomTabNavigator(tabScreenConfig, 
{
    tabBarOptions: {
        activeTintColor: Colors.primaryColor,
        labelStyle: {
            fontFamily: 'opan-sans-bold'
        }, 
    },
    
})

// You might wonder why stack for a single component?
// Because we want a header as well to stack navigator anyways gives it 
const FilterNavigator = createStackNavigator({
    Filter: FiltersScreen
},{
    defaultNavigationOptions: defaultNavigationOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFav: {
        screen: MealsFavTabNavigator, navigationOptions: {
            drawerLabel: "Meals"
        }
    },
    Filters: FilterNavigator
},{
    contentOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
            fontFamily: 'opan-sans-bold'
        }
    }
})









// export default createAppContainer(MealNavigator);
// export default createAppContainer(MealsFavTabNavigator);
export default createAppContainer(MainNavigator);