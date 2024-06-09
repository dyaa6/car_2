import React,{useState,useContext,useEffect} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import { Text, View, Switch,TextInput,TouchableOpacity } from 'react-native'
import Colors from "../components/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timer=({ navigation })=>{
    const {theme}=useContext(ThemeContext);
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);
    const [isEnabled,setIsenabled]=useState(true);
    const [timeValue,setTimeValue]=useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [msg,setMsg]=useState('');
    const [sucsess,setsucsess]=useState(false);
    const enableTimer=()=>{
    setIsenabled(prevState => !prevState);
    setMsg('');
}

useEffect(() => {
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://192.168.4.1/dev_ver';
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(parseInt(xhr.responseText)<4){
                  setMsg("عذراً، هذه الميزة ليست متوفرة لديك!");
                  navigation.navigate("الرئيسية");
                }
                else{
                  new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    const url = 'http://192.168.4.1/timerState';
                    xhr.onreadystatechange = () => {
                      if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                          if(xhr.responseText.split("#")[1]=="on"){
                            setIsenabled(true);
                            setTimeValue(parseInt(xhr.responseText.split("#")[0])/60);
                          }
                          else{
                            setIsenabled(false);
                          }
                        } else {
                          setMsg("هناك خطأ ما !");
                          setsucsess(false);
                          setIsLoading(false);
                        }
                      }
                    };
                    xhr.open('GET', url, true);
                    xhr.timeout = 2000; // set the timeout to 2 seconds
                    xhr.send();
                  });


                }
            } else {
              setMsg("لايمكن الاتصال بالسيارة!");
            }
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 1000;
        xhr.send();
      })
      .catch((error) => {
        setMsg(true);
      });
    },[]);

const getDevPass = async () => {
    try {
      // Retrieve the value using the key 'devPass'
      const devPass = await AsyncStorage.getItem('devPass');
        if (devPass !== null) {
        return devPass;
      } else {
        setMsg('لم تقم بتسجيل الدخول!');
        return null;
      }
    } catch (error) {
      setMsg('هناك خطأ ما', error);
      return null;
    }
  };
const sendRequest = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://192.168.4.1/passwdx';
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            setMsg("لايمكن الاتصال بالسيارة!");
            setsucsess(false);
            setIsLoading(false);
          }
        }
      };
  
      xhr.open('GET', url, true);
      xhr.timeout = 2000; // set the timeout to 2 seconds
      xhr.send();
    });
  };
const setTimer=async ()=>{
    setIsLoading(true);
    try {
      const response = await sendRequest();
      const savedPass = await getDevPass();
      //setResponseText(response);
      if (timeValue === '' || timeValue === 0) {
        setMsg('يجب أن تدخل قيمة');
        setsucsess(false);
        setIsLoading(false);
        return;
      }
  
      if (response === savedPass) {
        if(isEnabled){
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://192.168.4.1/setUpTimer?value='+timeValue*60+'&state=on';
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  if(xhr.responseText=="Timer enabled"){
                      setMsg('تم حفظ التغييرات');
                      setsucsess(true);
                      setIsLoading(false);
                  }
              } else {
                setMsg("هناك خطأ ما !");
                setsucsess(false);
                setIsLoading(false);
              }
            }
          };
          xhr.open('GET', url, true);
          xhr.timeout = 2000; // set the timeout to 2 seconds
          xhr.send();
        });
        
      }
        else{//not enabled
          new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = 'http://192.168.4.1/setUpTimer?value=0&state=off';
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(xhr.responseText=="Timer enabled"){
                        setMsg('تم حفظ التغييرات');
                        setsucsess(true);
                        setIsLoading(false);
                    }
                } else {
                  setMsg("هناك خطأ ما !");
                  setsucsess(false);
                  setIsLoading(false);
                }
              }
            };
            xhr.open('GET', url, true);
            xhr.timeout = 2000; // set the timeout to 2 seconds
            xhr.send();
          });
        }
      } else {
        setIsLoading(false);
        setsucsess(false);
        await AsyncStorage.removeItem('devPass');
        await AsyncStorage.removeItem('isloggedin');
        navigation.navigate('تسجيل الدخول');
        return;
      }
  
      setIsLoading(false);
    } catch (error) {
      setMsg(error);
      setIsLoading(false);
    }
}

    return(
<View >
    <View style={{backgroundColor:activeColor.bgColor,alignItems:"center",flexDirection:"row-reverse",justifyContent:"space-between",paddingHorizontal:35,alignContent:"flex-start"}}>
            <Text style={{...Styles.normalFont,color:activeColor.fontColor}}>
                فصل الجهاز بعد مدة معينة
            </Text>

    <Switch
        trackColor={{ false: '#767577', true: activeColor.secondColor}}
        thumbColor={activeColor.dark?(isEnabled ? "#03078f" : '#9AA3A8'):(isEnabled ? activeColor.mainColor : '#f4f3f4')}
        ios_backgroundColor="#3e3e3e"
        onValueChange={enableTimer}
        value={isEnabled}
        style={Styles.smalSwitch} // set size
      />
        </View>
        <View style={{backgroundColor:activeColor.bgColor,alignItems:"center",flexDirection:"row-reverse",justifyContent:"space-around",paddingHorizontal:70,direction:"rtl",paddingVertical:20,display:isEnabled?"flex":"none"}} >
            <Text style={{...Styles.normalFont,color:activeColor.fontColor}}>
                فصل بعد
            </Text>
<TextInput
    style={{
        ...Styles.textboxtext,
        borderWidth: 1,
        borderColor: activeColor.mainColor,
        width: 65,
        height: 35,
        textAlign: "center",
        borderRadius: 15,
        fontSize: 22,
    }}
    placeholderTextColor={activeColor.placeHoleder}
    value={timeValue.toString()} // Convert to string
    onChangeText={(text) => {
        // Ensure only numeric values and limit to 3 digits
        const numericValue = text.replace(/[^0-9]/g, ''); 
        const limitedValue = numericValue.slice(0, 3);
        setTimeValue(limitedValue);
    }}
    inputMode="numeric"
    maxLength={3} // Set maximum length
/>

        <Text style={{...Styles.normalFont,color:activeColor.fontColor}}>
            {timeValue>2 && timeValue<11?"دقائق":"دقيقة"}
        </Text>
        </View>
    <View style={{paddingHorizontal:30,backgroundColor:activeColor.bgColor}}>
    <Text style={{color:sucsess?"green":"red", textAlign:"right",direction:"rtl",marginTop:-10,marginBottom:10}}>{msg}</Text>
        <TouchableOpacity
          style={[ Styles.formButton, isLoading && Styles.loadingLoginButton]}
          onPress={setTimer}
          disabled={isLoading}
        >
          <Text style={Styles.buttonText}>{isLoading ? 'جارِ الحفظ..' : 'حفظ'}</Text>
        </TouchableOpacity>
    </View>
        <View style={{backgroundColor:activeColor.bgColor,height:"100%"}}>
            
        </View>
        </View>
    )
}
export default Timer;
