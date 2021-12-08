import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';




export const networkAvailable = () => new Promise((resolve, reject) =>
    NetInfo.fetch().then(state => state.isConnected ? resolve(true) : resolve(false)))



export const serverCall = async (url,method,data) =>  new Promise(async (resolve,reject) => {
    let net = await networkAvailable();
    if(!net){
        alert('Please check your internet connection')
    }else{
        let headers = {};

        let requestObject = {};
        if(method == "GET"){
            requestObject = {
                url,method,headers
            }
        }else{
            requestObject = {
                url,method,data,headers
            }
        }

        axios.request(requestObject).then(async (response)=>{
            if(response.status == 200){
                resolve({success : true,data : response.data})
            }
        }).catch(async (error)=>{
            resolve({success : false, data : {},error : error})
        })
    }

});
