import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback} from 'react-native';


const CategoryGridTile  = (props) => {

    let TouchableCom = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCom = TouchableNativeFeedback
    }

    return (
        <View style = {styles.gridItems}>
            <TouchableCom style = {{flex: 1}} 
                                onPress = {props.onSelect}>
                <View style = {{...styles.container, ...{backgroundColor: props.color} }}>
                    <Text style = {styles.title}>{props.title}</Text>
                </View>

            </TouchableCom>
        </View>
    )
}


export default CategoryGridTile;


const styles = StyleSheet.create({
    gridItems: {
        flex: 1,
        marginHorizontal: 15,
        marginVertical: 15,
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5 // Shadow for androids

    },
    container: {
        flex: 1,
        borderRadius: 7,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'

    },

    title: {
        fontFamily: 'opan-sans-bold',
        fontSize: 20,
        textAlign: 'right'
    }

})