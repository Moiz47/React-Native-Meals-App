import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform} from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTile from '../Components/categoryGridTile'; 
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';

const CategoryScreen = props => {


    const renderGridItems = (data) => {
        return (
            <CategoryGridTile title = {data.item.title} 
                              color = {data.item.color}
                              onSelect = {() => props.navigation.navigate({routeName: 'CategoryMeal',
                                params: {
                                    categoryID: data.item.id
                                }
                              })
                            }/>
        )
    }

    return (
            <FlatList data = {CATEGORIES}
                      numColumns = {2}
                      renderItem = {renderGridItems}
                      keyExtractor = {(item, index) => item.id}
                      />
            )
}

/* You can assing a navigationOptions property to you functional component which 
is rendered through stacknavigator.  
StackNavigator looks for that property by default. you can use it for different styles
 */
CategoryScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                        <Item title = 'menu' 
                              iconName = 'ios-menu' 
                              onPress = {() => {navData.navigation.toggleDrawer()}} />

                    </HeaderButtons>
    }
}


export default CategoryScreen;




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

  
})
