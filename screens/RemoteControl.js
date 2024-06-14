import react,{useState,useContext,useEffect} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";import {View,Text,TouchableOpacity, ScrollView, I18nManager, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from "../components/Styles";
import Colors from "../components/Colors";
import { FontAwesome } from '@expo/vector-icons';
 const Remote = ({ navigation })=>{
    const [opencode,setOpenCode]=useState(0);
    const [lockCode,setLockcode]=useState(0);
    const [powerCode,setPowerCode]=useState(0);
    const [runCode,setRunCode]=useState(0);
    const [boxCode,setBoxCode]=useState(0);
    const [msg,setMsg]=useState("جارِ الاتصال..");
    const [msgState,setMsgState]=useState(true);
    const [notSupport,setNotSupport]=useState("عذراً, هذه الميزة ليست متوفرة لديك.");
    const [notSupportState,setNotSupportState]=useState(false);
    //waiting
    const [powerWaiting,setPowerWaiting]=useState(false);
    const [runWaiting,setRunWaiting]=useState(false);
    const [openWaiting,setOpenWaiting]=useState(false);
    const [lockWaiting,setLockWaiting]=useState(false);
    const [boxWaiting,setBoxWaiting]=useState(false);
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);

    const {theme}=useContext(ThemeContext)
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);




  const updateKeys=()=>{
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://2.2.2.2/remoteCodes';
    
        xhr.onreadystatechange = async() => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
              setMsgState(false);
              setPowerCode(xhr.responseText.split("#")[0]);
              setRunCode(xhr.responseText.split("#")[1]);
              setOpenCode(xhr.responseText.split("#")[2]);
              setLockcode(xhr.responseText.split("#")[3]);
              setBoxCode(xhr.responseText.split("#")[4]);
            } else {
              setMsg("لا يمكن الإتصال بالسيارة");
              setMsgState(true);
              reject("error");
            }   
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 800; // set the timeout to 2 seconds
        xhr.send();
      })
      .catch((error) => {
        setMsgState(true);
      });
    }
    useEffect(() => {
        updateKeys();
        },[]);
        
// sycronisation
  useEffect(() => {
    const interval=setInterval(()=>{
      updateKeys();
    },200);
    return ()=> clearInterval(interval);
  }, []);

        const auth=async (wt)=>{
              switch(wt){
                case 'authPower':
                    setPowerWaiting(true);
                    break;
                case 'authRun':
                    setRunWaiting(true);
                    break;
                case 'authOpen':
                    setOpenWaiting(true);
                    break;
                case 'authLock':
                    setLockWaiting(true);
                    break;
                case 'authBox':
                    setBoxWaiting(true);
                    break;
            }
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                const url = 'http://2.2.2.2/'+wt;
                xhr.onreadystatechange = () => {
                  if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        updateKeys();
                        switch(wt){
                            case 'authPower':
                                setPowerWaiting(false);
                                break;
                            case 'authRun':
                                setRunWaiting(false);
                                break;
                            case 'authOpen':
                                setOpenWaiting(false);
                                break;
                            case 'authLock':
                                setLockWaiting(false);
                                break;
                            case 'authBox':
                              setBoxWaiting(false);
                              break;
                        }
                    } else {
                      setMsgState(true);
                      setMsg("لايمكن الاتصال بالسيارة!");
                      switch(wt){
                        case 'authPower':
                            setPowerWaiting(false);
                            break;
                        case 'authRun':
                            setRunWaiting(false);
                            break;
                        case 'authOpen':
                            setOpenWaiting(false);
                            break;
                        case 'authLock':
                            setLockWaiting(false);
                            break;
                        case 'authBox':
                          setBoxWaiting(false);
                          break;
                    }
                    }
                  }
                };
                xhr.open('GET', url, true);
                xhr.timeout = 300; // set the timeout to 2 seconds
                xhr.send();
              })
              .catch((error) => {
                setMsgState(true);
              });
               
        }

    const reset=async (button)=>{
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://2.2.2.2/'+button;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                setTimeout(()=>{
                    updateKeys();
                },500);
            } 
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 300; // set the timeout to 2 seconds
        xhr.send();
      })
      .catch((error) => {
        setMsgState(true);
      });
  }
    return(
    <ScrollView style={Styles.body}>
      <View style={{alignItems:"center"}}>
        <View style={msgState? {display:'flex'} : {display:'none'}}>
          <Text style={Styles.messageText}>{msg}</Text>
        </View>
    
        <View style={notSupportState? {display:'flex'} : {display:'none'}}>
          <Text style={Styles.messageText}>{notSupport}</Text>
        </View>
        <TouchableOpacity 
            onPress={()=>{auth('authPower')}}
            style={{...Styles.pannel,backgroundColor: powerWaiting?Colors.waiting:activeColor.mainColor}}>
                <View style={Styles.remoteTitle}>
                  <Text style={Styles.pannelFontMid}>إطفاء</Text>
                  <FontAwesome name="power-off" size={40} color="#fff" />
                </View>
            <View><Text style={{...Styles.normalFont,margin:10}}>
                {powerWaiting?"جارِ إنتظار الضغط على الزر..":"انقر لإضافة زر جديد"}
                </Text></View>
                <View style={Styles.codeContainer}>
                    <TouchableOpacity 
                    onPress={()=>{reset('resetPower')}}
                    style={Styles.resetButton}><Text style={[Styles.normalFont,Styles.resetButtonFont]}>
                        تصفير
                        </Text></TouchableOpacity>
                        <Text style={{...Styles.normalFont,paddingTop:8}}>{powerCode}</Text>
                </View>
        </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=>{auth('authRun')}}
            style={{...Styles.pannel,backgroundColor: runWaiting?Colors.waiting:activeColor.mainColor}}>
                <View style={Styles.remoteTitle}>
                  <Text style={Styles.pannelFontMid}>تشغيل</Text>
                  <Image source={require('../assets/car-engine.png')} style={{width:40,height:40}}/>
                </View>
                <View><Text style={{...Styles.normalFont,margin:10}}>
                {runWaiting?"جارِ إنتظار الضغط على الزر..":"انقر لإضافة زر جديد"}
                    </Text></View>
                    <View style={Styles.codeContainer}>
                        <TouchableOpacity 
                        onPress={()=>{reset('resetRun')}}
                        style={Styles.resetButton}><Text style={[Styles.normalFont,Styles.resetButtonFont]}>
                            تصفير
                            </Text></TouchableOpacity>
                            <Text style={{...Styles.normalFont,paddingTop:8}}>{runCode}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{auth('authOpen')}}
            style={{...Styles.pannel,backgroundColor: openWaiting?Colors.waiting:activeColor.mainColor}}>
                <View style={Styles.remoteTitle}>
                  <Text style={Styles.pannelFontMid}>فتح</Text>
                  <FontAwesome name="unlock" size={44} color="#fff" />
                </View> 
                <View><Text style={{...Styles.normalFont,margin:10}}>
                {openWaiting?"جارِ إنتظار الضغط على الزر..":"انقر لإضافة زر جديد"}
                    </Text></View>
                    <View style={Styles.codeContainer}>
                        <TouchableOpacity 
                        onPress={()=>{reset('resetOpen')}}
                        style={Styles.resetButton}><Text style={[Styles.normalFont,Styles.resetButtonFont]}>
                            تصفير
                            </Text></TouchableOpacity>
                            <Text style={{...Styles.normalFont,paddingTop:8}}>{opencode}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{auth('authLock')}}
            style={{...Styles.pannel,backgroundColor: lockWaiting?Colors.waiting:activeColor.mainColor}}>
                <View style={Styles.remoteTitle}>
                  <Text style={Styles.pannelFontMid}>قفل</Text>
                  <FontAwesome name="lock" size={44} color="#fff" />
                </View>
                <View><Text style={{...Styles.normalFont,margin:10}}>
                {lockWaiting?"جارِ إنتظار الضغط على الزر..":"انقر لإضافة زر جديد"}
                    </Text></View>
                    <View style={Styles.codeContainer}>
                        <TouchableOpacity 
                        onPress={()=>{reset('resetLock')}}
                        style={Styles.resetButton}><Text style={[Styles.normalFont,Styles.resetButtonFont]}>
                            تصفير
                            </Text></TouchableOpacity>
                            <Text style={{...Styles.normalFont,paddingTop:8}}>{lockCode}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{auth('authBox')}}
            style={{...Styles.pannel,backgroundColor: boxWaiting?Colors.waiting:activeColor.mainColor}}>
                <View style={Styles.remoteTitle}>
                  <Text style={Styles.pannelFontMid}>الصندوق</Text>
                  <Image source={require('../assets/trunk-open.png')} style={{width:52,height:29}}/>
                </View>
                <View><Text style={{...Styles.normalFont,margin:10}}>
                {boxWaiting?"جارِ إنتظار الضغط على الزر..":"انقر لإضافة زر جديد"}
                    </Text></View>
                    <View style={Styles.codeContainer}>
                        <TouchableOpacity 
                        onPress={()=>{reset('resetBox')}}
                        style={Styles.resetButton}><Text style={[Styles.normalFont,Styles.resetButtonFont]}>
                            تصفير
                            </Text></TouchableOpacity>
                            <Text style={{...Styles.normalFont,paddingTop:8}}>{boxCode}</Text>
                    </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{reset('resetAll')}}
            style={{...Styles.pannel,backgroundColor: Colors.thirdColor, alignItems:"center",marginBottom:70}}>
                <Text style={[Styles.pannelFontMid,Styles.resetButtonFont]}>
                    تصفير الكل
                </Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Remote