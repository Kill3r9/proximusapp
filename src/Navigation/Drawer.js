
import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Switch, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import QRCode from 'react-native-qrcode-svg';
import DeviceInfo from 'react-native-device-info';
import { useTheme } from '../Utilities/ThemeContext';

export const DrawerContent = (props) => {
    const { setScheme, isDark, colors } = useTheme();

    const toggleScheme = () => {
        isDark ? setScheme('light') : setScheme('dark');
    }
    return (
        <DrawerContentScrollView scrollEnabled={false} contentContainerStyle={{ flex: 1, padding: 20,backgroundColor : colors.background,justifyContent : 'center' }}>
            <View style={{ paddingHorizontal: 10,justifyContent : 'center',alignItems : 'center' }}>
                <View style={{ flexDirection: 'row',...styles.containerStyle }} >
                    <Text style={styles.textStyle}>Switch to {isDark ? 'Light' : 'Dark'} mode</Text>
                    <Switch style={{ borderColor : '#19b38d'}} value={isDark} onValueChange={toggleScheme} />
                </View>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row',...styles.containerStyle }}>
                        <Text style={styles.textStyle}>Favourites</Text>
                        <Image source={require('../Assets/icons/dark_fav_icon.png')} style={{ width : 30,height : 30,marginLeft : 20}} />
                    </View>
                </TouchableOpacity>
                
                <View style={{...styles.containerStyle,alignItems : 'flex-start'}}>
                <Text style={styles.textStyle}>QR Code</Text>
                <QRCode
                    size={100}
                    value={JSON.stringify({
                        "platform": Platform.OS,
                        "os_version": DeviceInfo.getSystemVersion(),
                        "model": DeviceInfo.getModel(),
                        "current_owner": "Test_User"
                    })}
                />
                </View>
                
            </View>

        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    textStyle : {
        marginLeft: 15,
        color: '#000',
        fontSize : 18
    },
    containerStyle : {
        alignItems : 'center',
        marginBottom : 20,
        backgroundColor : '#fff',
        borderRadius : 10,
        height : 40
    }
})