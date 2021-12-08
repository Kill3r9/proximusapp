import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

export const Button = (props) => {
    return (
        // <View style={{ flex:1 }}>
            <TouchableOpacity
            onPress={props.onClick}
            style={{
             
                backgroundColor : props.bgColor ? props.bgColor : '#19b38d',
                justifyContent : 'center',
                alignItems : 'center',
                height : 40,
                width : 150,
                borderRadius : 10,
                paddingHorizontal : 10,
                borderColor : 'black',
                flexDirection : 'row'
            }}
            >
                {
                    props.url ? 
                    <Image source={props.url} />
                    :  
                    null
                }
                <Text
                style={{
                    color : props.labelColor ? props.labelColor : '#fff',
                    fontSize : 16
                }}>{props.label}</Text>
            </TouchableOpacity>
        // </View>
    );
}