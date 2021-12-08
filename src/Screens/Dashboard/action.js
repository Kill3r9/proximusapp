export const ADD_DEVICE = "ADD_DEVICE";
export const UPDATE_DEVICE = "UPDATE_DEVICE";
export const DELETE_DEVICE = "DELETE_DEVICE";
export const IMPORT_DEVICES = "IMPORT_DEVICES";

export function importDevicesAction(data){
    return { type : IMPORT_DEVICES , data }
}


export function addDevice(data){
    return { type : ADD_DEVICE , data }
}

export function updateDevice(index,data){
    return { type : UPDATE_DEVICE,index : index,data : data}
}

export function deleteDevice(index){
    console.log('Type',index);
    return { type : DELETE_DEVICE , index : index }
}