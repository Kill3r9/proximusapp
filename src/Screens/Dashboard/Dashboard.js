import React, { Component } from 'react';
import { Text, View, FlatList, ImageBackground, StyleSheet, Pressable, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeContext } from '../../Utilities/ThemeContext';
import { exportDevices } from '../../Utilities/utilities';
import { Button } from '../Components/Button';
import Card from '../Components/Card';
import { addTestDevice, deleteTestDevice } from '../Dashboard/dispatcher'

export const RenderTestDevices = (props) => {
    let _keyExtractor = (item, index) => index.toString();
    return (

        <FlatList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
            data={props.data}
            //   numColumns={2}
            keyExtractor={(_keyExtractor)}
            ListEmptyComponent={() => {
                return (<View style={{ alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#121212' }}>No Test Devices found..{'\n'} Please use add button to start adding test device..!!</Text>
                </View>);
            }}
            renderItem={({ item, index }) =>
                <View style={{ flex: 1, paddingVertical: 20 }}>
                    <Card backgroundColor={props.color.background}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,marginRight : 10 }}>
                            <View style={{ marginLeft: 20 ,flexShrink: 1}}>
                                <View style={{ flexDirection: 'row'}}>
                                    <Text style={{ ...styles.headerText, color: props.color.text }}>Platform : </Text>
                                    <Text style={{ ...styles.subHeaderText, color: props.color.text,flexShrink: 1 }}>{item.platform}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.headerText, color: props.color.text }}>OS : </Text>
                                    <Text style={{ ...styles.subHeaderText, color: props.color.text,flexShrink: 1 }}>{item.os_version}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.headerText, color: props.color.text }}>Model : </Text>
                                    <Text style={{ ...styles.subHeaderText, color: props.color.text,flexShrink: 1 }}>{item.model}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.headerText, color: props.color.text }}>Current User : </Text>
                                    <Text style={{ ...styles.subHeaderText, color: props.color.text,flexShrink: 1 }}>{item.current_owner}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...styles.headerText, color: props.color.text }}>Notes : </Text>
                                    <Text style={{ ...styles.subHeaderText, color: props.color.text,flexShrink: 1 }}>{item.notes}</Text>
                                </View>

                            </View>
                            <QRCode
                                size={100}
                                value={JSON.stringify({
                                    "platform": item.platform,
                                    "os_version": item.os_version,
                                    "model": item.model,
                                    "current_owner": item.current_owner
                                })}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button
                                bgColor={props.color.primary}
                                onClick={() => { props.navigation.navigate('Manage_Device', { "data": item, "index": index, "isUpdate": true }) }}
                                label={'Edit device'}
                            />
                            <Button
                                bgColor={'#ff704d'}
                                onClick={() => {
                                    props.navigation.navigate('DeleteDevicePopup', { "data": item, "index": index, })
                                }}
                                label={'Delete device'}
                            />
                        </View>
                    </Card>
                </View >
            }
        />

    );
}

class Dashboard extends Component {
    static contextType = ThemeContext;

    constructor (props) {
        super(props);
        this.state = {
            testDevices: []
        }
    }


    addNewDevice = () => {
        this.props.navigation.navigate('Manage_Device', { "isUpdate": false })
    }



    render() {
        return (
            <View style={{ flex: 1, paddingVertical: 20 }}>
                <RenderTestDevices color={this.context.colors} data={this.props.testDevices} {...this.props} />
                <Pressable onPress={() => { exportDevices(this.props.testDevices); }} style={styles.floatingExportContainer}>
                    <Image source={require('../../Assets/icons/export_light_icon.png')} style={{ width: 50, height: 50 }} resizeMode='contain' />
                </Pressable>
                <Pressable onPress={() => { this.addNewDevice(); }} style={styles.floatingAddContainer}>
                    <Image source={require('../../Assets/icons/light_add_icon.png')} style={{ width: 50, height: 50 }} resizeMode='contain' />
                </Pressable>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        testDevices: state.dashboard.testDevices
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        fontWeight: '700'
    },
    subHeaderText: {
        fontSize: 18
    },
    floatingAddContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#19b38d'
    },
    floatingExportContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        bottom: 30,
        backgroundColor: '#19b38d'
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        addTestDevice: bindActionCreators(addTestDevice, dispatch),
        deleteTestDevice: bindActionCreators(deleteTestDevice, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
