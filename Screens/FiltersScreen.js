import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Switch, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButton';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import filterMeals from '../store/actions/Meals.action';

const FilterSwitch = (props) => {
    return (
        <View style = {styles.filterContainer}>
                    <Text>{props.label}</Text>
                    <Switch
                        trackColor = {{true: Colors.primaryColor}} 
                        thumbColor = {Platform.OS === 'android' ? Colors.primaryColor: ''}
                        value = {props.state}
                        onValueChange = {props.onChange}
                    />
                </View>
    )
}


const FiltersScreen = props => {

    const [glutenFree, setGlutenFree] = useState(false);
    const [lactoseFree, setLactoseFree] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);

    const {navigation} = props;

    const dispatch = useDispatch();
    
    const SaveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: glutenFree,
            lactoseFree: lactoseFree,
            vegan: vegan,
            vegetarian: vegetarian
        }
        
        
        // dispatch(filterMeals(appliedFilters))
        dispatch(filterMeals(appliedFilters))

    }, [glutenFree, lactoseFree, vegan, vegetarian, dispatch])


    useEffect(() => {
        navigation.setParams({save: SaveFilters})
    }, [SaveFilters])


    return (
            <View style = {styles.screen}>
                <Text style = {styles.title}>Available Filters / Options</Text>
                <FilterSwitch
                    label = "Gluten Free"
                    state = {glutenFree}
                    onChange = {(newValue) => setGlutenFree(newValue)}
                />
                <FilterSwitch
                    label = "Lactose Free"
                    state = {lactoseFree}
                    onChange = {(newValue) => setLactoseFree(newValue)}
                />
                <FilterSwitch
                    label = "Is Vegan"
                    state = {vegan}
                    onChange = {(newValue) => setVegan(newValue)}
                />
                <FilterSwitch
                    label = "is Vegetarian"
                    state = {vegetarian}
                    onChange = {(newValue) => setVegetarian(newValue)}
                />
            </View>
            )
}


FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter!',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
                                <Item title = 'menu' 
                                    iconName = 'ios-menu' 
                                    onPress = {() => {navData.navigation.toggleDrawer()}} />

                            </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent = {HeaderButton}>
                                <Item title = 'Save' 
                                    iconName = 'ios-save' 
                                    onPress = {() => {
                                        navData.navigation.getParam('save')();
                                    }} />

                            </HeaderButtons>)
        
    }

}


export default FiltersScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
    title:{
        fontFamily: 'opan-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }

})
