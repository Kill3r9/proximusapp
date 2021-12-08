import React, { Component } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { goBack } from '../../Utilities/utilities';
import { Button } from './Button';
import { deleteTestDevice } from '../Dashboard/dispatcher'
import { bindActionCreators } from 'redux';
import { serverCall } from '../../API';


class DeleteDevicePopup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isDeleting: false,
            isDeleted: false,
            quote: ''
        }
    }


    deleteTheDevice = async (index) => {
        this.setState({ isDeleting: true })
        let response = await serverCall('https://zenquotes.io/api/today', 'GET', {});
        console.log(JSON.stringify(response))
        if (response.success) {
            await this.props.deleteTestDevice(index);
            this.setState({ isDeleting: false, isDeleted: true, quote: response['data'][0]["q"] })

        } else {
            await this.props.deleteTestDevice(index);
            this.setState({ isDeleting: false, isDeleted: true, quote: '' })
            goBack();
        }
        return;
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >

                <View style={{ flex: 1 }}>
                    <Pressable style={{ flex: 1, }} onPress={() =>
                         this.props.navigation.pop()
                    } />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 200}
                    style={{
                        flex: 1,
                        position: "absolute",
                        bottom: 0,
                        width: '100%',
                        backgroundColor: "#fff",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }}
                >

                    <Pressable style={{ flex: 1, marginTop: 10 }} onPress={() =>
                         this.props.navigation.pop()
                    }>
                        <Image source={require('../../Assets/icons/ic_popup_close.png')} style={{ height: 30, width: 30, alignSelf: "flex-end", marginRight: 12 }} />
                    </Pressable>
                    <View style={{ ...styles.container }}>



                        {
                            this.state.quote && this.state.isDeleted ?
                                <View style={{flex : 1}}>
                                    <Text style={{ ...styles.primaryText }}>Quote of the day : </Text>
                                    <Text style={{ ...styles.primaryText }}>{this.state.quote}</Text>
                                </View> :
                                <>
                                    <Text style={{ ...styles.primaryText }}>{'Are you sure you want to delete this device ?'}</Text>

                                    <View style={{
                                        ...styles.actionRow
                                    }}>

                                        <Button
                                            label={'Cancel'}
                                            onClick={() => {
                                                this.props.navigation.pop()
                                            }}
                                        >
                                        </Button>

                                        {
                                            this.state.isDeleting ?
                                                <View style={{
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <ActivityIndicator size='small' color='#19b38d' />
                                                </View>

                                                :
                                                <Button
                                                    bgColor={'#ff704d'}
                                                    label={'Yes,delete'}
                                                    onClick={() => {
                                                        this.deleteTheDevice(this.props.route.params.index);
                                                    }}
                                                >
                                                </Button>
                                        }
                                    </View>
                                </>
                        }
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTestDevice: bindActionCreators(deleteTestDevice, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(DeleteDevicePopup);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    primaryText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginTop: 30
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40
    }
})
