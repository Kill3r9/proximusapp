import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import {
    NavigationContainer,
} from '@react-navigation/native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { DrawerContent } from './Drawer';
import Dashboard from '../Screens/Dashboard/Dashboard';
import { DrawerContent } from './Drawer';
import ManageDevice from '../Screens/ManageDevice/ManageDevice';
import DeleteDevicePopup from '../Screens/Components/DeleteDevicePopup';
import { importDevices } from '../Utilities/utilities';
import {importDevicesAction} from '../Screens/Dashboard/action'
const Stack = createStackNavigator();
export const navigationRef = React.createRef();
import { useDispatch } from 'react-redux';
import { useTheme } from '../Utilities/ThemeContext';


function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName={'Dashboard'}
            screenOptions={{
                headerShown: false,
                headerMode: 'none',
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name={'Dashboard'}
                component={Dashboard}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={'Manage_Device'}
                component={ManageDevice}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

function ModalStack({ style }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardOverlayEnabled: true,
                gestureEnabled: true,
                cardStyle: { backgroundColor: 'transparent', },
                presentation: 'modal'
            }}
        >
            <Stack.Screen name="Home" component={StackNavigator} />
            <Stack.Screen
                name={'DeleteDevicePopup'}
                component={DeleteDevicePopup}
            />
        </Stack.Navigator>
    )
}


const Drawer = createDrawerNavigator();

function DrawerStack() {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator
                screenOptions={{
                    // headerShown : false,
                    headerStyle: {
                        backgroundColor: colors.background
                    },
                    drawerPosition: "left",
                    drawerType: "slide",
                    overlayColor: "transparent",
                    contentContainerStyle: { flex: 1 },
                    
                }}

                sceneContainerStyle={{ backgroundColor: 'white' }}
                drawerContent={(props) => {
                    return <DrawerContent {...props} />;
                }}>
                <Drawer.Screen
                    name="Main"
                    options={({ navigation }) => {
                        return ({
                            headerTitle: '',
                            headerLeft: () => {
                                return (<TouchableOpacity
                                    onPress={() => { navigation.toggleDrawer(); }}
                                    style={{ width: 45, height: 45, justifyContent: 'center' }}>
                                    <Image source={require('../Assets/icons/hamburger_white.png')} style={{ width: 45, height: 45 }} />
                                </TouchableOpacity>)
                            },
                            headerRight: () => {
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Pressable onPress={async() => {
                                           let importedData = await importDevices();
                                           dispatch(importDevicesAction(importedData))
                                         }} style={{width: 40, height: 40, justifyContent: 'center', marginRight: 20 }}>
                                            <Image source={require('../Assets/icons/import_light_icon.png')} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                        </Pressable>
                                        {/* <TouchableOpacity
                                            onPress={() => { navigation.navigate('ScanDevice') }}
                                            style={{ width: 40, height: 40, justifyContent: 'center', marginRight: 20 }}>
                                            <Image source={require('../Assets/icons/scanner_white.png')} style={{ width: 40, height: 35 }} />
                                        </TouchableOpacity> */}

                                    </View>
                                )
                            },
                        })
                    }}
                >
                    {() => <ModalStack />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export { DrawerStack };