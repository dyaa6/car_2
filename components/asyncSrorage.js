import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData=async (key, value)=>{
    try{
        let jsonValue=JSON.stringify(value);
        await AsyncStorage.setItem(key,jsonValue);
    }
    catch(e){
        console.log(e);
    }
}
export const getData= async (key)=>{
    try{
    let jsonValue= await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue);
}
catch(e){
    console.log(e);
}
}