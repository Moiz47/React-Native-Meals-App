import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MealList from '../Components/MealList';
// import {MEALS} from '../data/dummy-data';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import {useSelector} from 'react-redux';

const FavouriteScreen = props => {

    const favMeal = useSelector(state => state.meals.favouriteMeals)

    if(favMeal.length === 0 || !favMeal){
        return (
            <View style = {styles.fallback}><Text>No items present in Here</Text></View>
        )
    }else{
        return  <MealList data = {favMeal} navigation = {props.navigation}/>
    }
    // const favMeal = MEALS.filter(item => item.id === 'm1' || item.id === 'm2')
}


FavouriteScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Favourites!',
        headerLeft: () => <HeaderButtons HeaderButtonComponent = {HeaderButton}>
                        <Item title = 'menu' 
                              iconName = 'ios-menu' 
                              onPress = {() => {navData.navigation.toggleDrawer()}} />

                    </HeaderButtons>
    }

}


export default FavouriteScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
