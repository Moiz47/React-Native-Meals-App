import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import DefaultText from '../Components/DefaultText';


const MealItems = (props) => {
return (
    <View style = {styles.container}>
    <TouchableOpacity onPress = {props.clicked}>
        <View>
            <View style = {{...styles.mealRow, ...styles.header}}>
                <ImageBackground source = {{uri: props.image}} style = {styles.bgImage}>
                 <View style = {styles.titleContainer}>   
                    <Text style = {styles.title} numberOfLines = {1}>{props.title}</Text>
                </View>
                </ImageBackground>
            </View>
            <View style = {{...styles.mealRow, ...styles.body}}>
                <DefaultText>{props.duration}</DefaultText>
                <DefaultText>{props.complexity}</DefaultText>
                <DefaultText>{props.affordability}</DefaultText>
            </View>
        </View>
    </TouchableOpacity>
    </View>
)
}


export default MealItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden'
    },

    mealRow:{
        flexDirection: 'row'
    },

    header: {
        height: '85%'
    },

    body: {
        height: '15%',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },

    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },

    titleContainer:{    
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 5,
    },

    title: {        // on IOS there was a dark background just behind text so added title container
        fontFamily: 'opan-sans-bold',
        fontSize: 18,
        color: 'white',
        textAlign: 'center'

    }


})