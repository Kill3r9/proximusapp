import { addDevice,deleteDevice,updateDevice } from "./action";


export function addTestDevice(data){
    return async (dispatch) => {
        dispatch(addDevice(data));
    }
}

export function updateTestDevice(index,data){
    return async (dispatch) =>{
        dispatch(updateDevice(index,data));
    }    
}


export function deleteTestDevice(index){
    console.log('my id',index);
    return async (dispatch) =>{
        dispatch(deleteDevice(index));
    }
}