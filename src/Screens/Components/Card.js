import React from 'react';
import { StyleSheet,View} from 'react-native';


export default function Card(props){
    const styles = StyleSheet.create({
        card : {
            borderRadius : 20,
            elevation : 25,
            backgroundColor : props.backgroundColor ? props.backgroundColor : "#FFF",
            shadowOffset : { width : 1, height : 1},
            shadowOpacity : 0.2,
            shadowColor : "#000",
            width : "100%",
            paddingVertical : 20,
        }
    })

    return(
        <View style={styles.card}> 
            {props.children}
        </View>
    );
}