import { ADD_DEVICE, DELETE_DEVICE, UPDATE_DEVICE, IMPORT_DEVICES } from './action'

const dashboardInitialState = {
    testDevices: []
}

function DashboardReducer(state = dashboardInitialState, action) {
    console.log('immm hrere')
    switch (action.type) {
        case ADD_DEVICE:
            return {
                ...state,
                testDevices: [action.data, ...state.testDevices]
            }

        case UPDATE_DEVICE:
            const temp = [...state.testDevices];
            temp[action.index] = action.data
            return {
                ...state,
                testDevices: temp
            }

        case DELETE_DEVICE:
            let updatedDevices = state.testDevices.filter((device, index) => index !== action.index)
            return {
                ...state,
                testDevices: updatedDevices
            }

        case IMPORT_DEVICES:
            return {
                ...state,
                testDevices: [...action.data, ...state.testDevices]
            }

        default:
            return state;
    }
}

export default DashboardReducer;