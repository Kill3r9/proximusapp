import { Alert, Platform, PermissionsAndroid } from 'react-native'
import { navigationRef } from '../Navigation/RootNavigator';
import RNFS from 'react-native-fs';
import moment from 'moment';
import { useEffect } from 'react';
import XLSX from 'xlsx';
import { importTestDevice } from '../Screens/Dashboard/dispatcher'

export const goBack = () => {
    navigationRef.current?.goBack()
}

export const exportDevices = async (array) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Write File",
                message:
                    "App needs access to your external storage ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {


            if (array.length == 0) {
                Alert.alert('Nothing to export..Start adding test devices!!')
                return;
            }
            let file_name = "";
            let tmpPath = "";
            if (Platform.OS == "android") {
                file_name = 'Download/test_devices_' + moment(new Date()).format('YYYY-MM-DD') + ".xlsx";
                tmpPath = RNFS.ExternalStorageDirectoryPath;
            } else {
                file_name = 'test_devices_' + moment(new Date()).format('YYYY-MM-DD') + ".xlsx";
                tmpPath = RNFS.DocumentDirectoryPath;
            }

            let jsonArray = array
            // let json = {};
            //json = { ...array }
            var ws = XLSX.utils.json_to_sheet(jsonArray);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Records");
            const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

            const test_devices_file_path = `${tmpPath}/${file_name}`;
            await RNFS.writeFile(test_devices_file_path, wbout, 'ascii')
                .then((success) => {
                    Alert.alert('Export complete');
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
        }
    } catch (err) {
        console.warn(err);
    }

}


export const importDevices = async () => {
    let file_name = "";
    let tmpPath = "";
    if (Platform.OS == "android") {
        file_name = 'Download/test_devices_' + moment(new Date()).format('YYYY-MM-DD') + ".xlsx";
        tmpPath = RNFS.ExternalStorageDirectoryPath;
    } else {
        file_name = 'test_devices_' + moment(new Date()).format('YYYY-MM-DD') + ".xlsx";
        tmpPath = RNFS.DocumentDirectoryPath;
    }

    const test_devices_file_path = `${tmpPath}/${file_name}`;
    return await RNFS.readFile(test_devices_file_path, 'ascii')

        .then((contents) => {

            /* Parse data */
            // const bstr = evt.target.result;
            const wb = XLSX.read(contents, { type: 'binary' });

            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            let finalArray = data.split('\n')
            /* Update state */
            let keys = finalArray[0].split(",");


            let customJsonArray = []

            for (let i = 1; i < finalArray.length; i++) {

                let valueArr = finalArray[i].split(",");
                let objArray = null;
                for (let k = 0; k < valueArr.length; k++) {
                    objArray = { ...objArray, [keys[k]]: valueArr[k], }
                }
                if (Object.keys(objArray).length > 1) {
                    customJsonArray.push({ ...objArray })
                }
            }

            alert('Import Success')
            return customJsonArray;
        })
        .catch((err) => {
            alert('Import Failed,No file exist')
            console.log(err.message, err.code);

            return []
        });
}