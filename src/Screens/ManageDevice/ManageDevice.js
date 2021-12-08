import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '../Components/Button';
import { addTestDevice, updateTestDevice } from '../Dashboard/dispatcher'
import QRCode from 'react-native-qrcode-svg';
import { ThemeContext } from '../../Utilities/ThemeContext';

class ManageDevice extends Component {
    static contextType = ThemeContext; 

    constructor (props) {
        super(props);
        this.state = {
            platform: props.route.params.isUpdate ? props.route.params.data && props.route.params.data.platform : '',
            isPlatformError: false,
            os_version: props.route.params.isUpdate ? props.route.params.data && props.route.params.data.os_version : '',
            isOSError: false,
            model: props.route.params.isUpdate ? props.route.params.data && props.route.params.data.model : '',
            isModelError: false,
            current_owner: props.route.params.isUpdate ? props.route.params.data && props.route.params.data.current_owner : '',
            notes: props.route.params.isUpdate ? props.route.params.data && props.route.params.data.notes : '',
            isFromUpdate: props.route.params.isUpdate ? props.route.params.isUpdate : false
        }
    }

    onChangePlatform = (platform) => {
        if (platform) {
            this.setState({
                platform,
                isPlatformError: false
            })
        } else {
            this.setState({
                platform,
                isPlatformError: true
            })
        }
    }

    onChangeOSVersion = (os_version) => {
        if (os_version.length == 0) {
            this.setState({
                os_version,
                isOSError: true
            })
        } else {
            this.setState({
                os_version,
                isOSError: false
            })
        }
    }

    onChangeModel = (model) => {

        if (model.length == 0) {
            this.setState({
                model,
                isModelError: true
            })
        } else {
            this.setState({
                model,
                isModelError: false
            })
        }

    }

    onChangeCurrentOwner = (current_owner) => {
        this.setState({
            current_owner
        });
    }

    onChangeNotes = (notes) => {
        this.setState({
            notes
        })
    }

    checkValidations = () => {
        let { platform, model, os_version, isOSError, isModelError, isPlatformError } = this.state;
        if (!platform) {
            isPlatformError = true
        }
        if (!model) {
            isModelError = true
        }
        if (!os_version) {
            isOSError = true
        }
        this.setState({
            isPlatformError,
            isOSError,
            isModelError
        })
    }

    onSubmit = async () => {
        let { platform, model, current_owner, notes, os_version, isOSError, isModelError, isPlatformError } = this.state;
        await this.checkValidations();
        if (!platform || !model || !os_version) {
            return;
        }
        let data = {
            "platform": platform ?? platform,
            "os_version": os_version ?? os_version,
            "model": model ?? model,
            "current_owner": current_owner ?? current_owner,
            "notes": notes ?? notes
        }
        if (this.state.isFromUpdate) {
            this.props.updateTestDevice(this.props.route.params.index, data);
            this.props.navigation.pop();
        }
        else {
            this.props.addTestDevice(data);
            this.props.navigation.pop();
        }
    }

    render() {

        let { isFromUpdate, platform, os_version, model, current_owner, notes } = this.state;
        return (
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                    {
                        isFromUpdate ?
                            <>
                                <View style={{ marginBottom: 30 }}>
                                    <QRCode
                                        size={100}
                                        value={JSON.stringify({
                                            "platform": platform,
                                            "os_version": os_version,
                                            "model": model,
                                            "current_owner": current_owner,
                                            "notes": notes
                                        })}
                                    />
                                </View>
                                <ManageDeviceForm
                                    data={this.state}
                                    onChangePlatform={this.onChangePlatform}
                                    onChangeOSVersion={this.onChangeOSVersion}
                                    onChangeModel={this.onChangeModel}
                                    onChangeCurrentOwner={this.onChangeCurrentOwner}
                                    onChangeNotes={this.onChangeNotes}
                                    onSubmit={this.onSubmit}
                                    buttonLabel={'Update device'}
                                />
                                <View style={{ marginTop: 20 }}>
                                </View>
                            </>
                            :
                            <>
                                <ManageDeviceForm
                                    data={this.state}
                                    onChangePlatform={this.onChangePlatform}
                                    onChangeOSVersion={this.onChangeOSVersion}
                                    onChangeModel={this.onChangeModel}
                                    onChangeCurrentOwner={this.onChangeCurrentOwner}
                                    onChangeNotes={this.onChangeNotes}
                                    onSubmit={this.onSubmit}
                                    buttonLabel={'Add device'}
                                />
                            </>
                    }
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }

}


const ManageDeviceForm = (props) => {
    return (
        <>
            <View style={styles.textInputContainer}>
                <TextInput
                    maxLength={50}
                    value={props.data.platform}
                    placeholder={'Enter the Device platform'}
                    onChangeText={(text) => props.onChangePlatform(text)}
                />
            </View>
            {
                props.data.isPlatformError ?
                    <View><Text style={styles.errorText} >Device platform is required</Text></View>
                    : null
            }

            <View style={styles.textInputContainer}>
                <TextInput
                    maxLength={50}
                    value={props.data.os_version}
                    placeholder={'Enter the OS version'}
                    onChangeText={(text) => props.onChangeOSVersion(text)}
                />
            </View>
            {
                props.data.isOSError ?
                    <View><Text style={styles.errorText} >OS version is required</Text></View>
                    : null
            }

            <View style={styles.textInputContainer}>
                <TextInput
                    maxLength={50}
                    value={props.data.model}
                    placeholder={'Enter the device model'}
                    onChangeText={(text) => props.onChangeModel(text)}
                />
            </View>
            {
                props.data.isModelError ?
                    <View><Text style={styles.errorText} >Device model is required</Text></View>
                    : null
            }

            <View style={styles.textInputContainer}>
                <TextInput
                    maxLength={50}
                    value={props.data.current_owner}
                    placeholder={'Enter the device current_owner'}
                    onChangeText={(text) => props.onChangeCurrentOwner(text)}
                />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput
                    maxLength={50}
                    multiline={true}
                    numberOfLines={6}
                    value={props.data.notes}
                    placeholder={'Notes'}
                    onChangeText={(text) => props.onChangeNotes(text)}
                />
            </View>
            <Text>{props.model}</Text>


            <Button
                label={props.buttonLabel}
                onClick={() => props.onSubmit()}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        testDevices: state.dashboard.testDevices
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addTestDevice: bindActionCreators(addTestDevice, dispatch),
        updateTestDevice: bindActionCreators(updateTestDevice, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDevice)

const styles = StyleSheet.create({
    textInputContainer: {
        padding: 5,
        borderRadius: 10,
        width: '70%',
        // height: 60,
        maxHeight: 100,
        borderWidth: 1,
        borderColor: '#19b38d',
        marginBottom: 5,
        marginTop : 15
    },
    errorText: {
        color: 'red'
    },
    error: {
        borderWidth: 1,
        borderColor: 'red'
    },
})