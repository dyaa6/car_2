import React, { useState, useEffect,useContext } from 'react';
import { ThemeContext } from '../components/ThemeContect';
import useThemeStyles from '../components/Styles';
import { View,Text, TouchableOpacity,StatusBar,Switch,StyleSheet,ImageBackground,I18nManager,Image, Vibration } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../components/Colors';
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
//import { Font } from 'expo';



const Home = ({ navigation }) => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [unlockActive, setUnlockActive] = useState(false);
  const [lockActive, setLockActive] = useState(false);
  const [boxActive, setBoxActive] = useState(false);
  const [GlassActive, setGlassActive] = useState(false);
  const [ledOne,setLedONe]=useState(false);
  const [ledTwo,setLedTwo]=useState(false);
  const [ledThree,setLedThree]=useState(false);
  const [stateLed,setStateLed]=useState(false);
  const [switchOneEnabled,setSwitchOneEnabled]=useState(true);
  const [switchTwoEnabled,setSwitchTwoEnabled]=useState(false);
  const [buttonOneEnabled,setButtonOneEnabled]=useState(true);
  const [errormsg,setErrormsg]=useState('the error text will be here');
  const [errormsgState,setErrormsgState]=useState(false);
// switch 1
const [isEnabled1, setIsEnabled1] = useState(false);//switch one is on
const [isEnabled2, setIsEnabled2] = useState(false);// switch two is on
const [pressed, setPressed] = useState(false);//run button
const [mode,setMode]=useState(true);
const [powerButtonDown,setPowerButtonDown]=useState(false);
const [powerButtonUp,setPowerButtonUp]=useState(false);
const [timer,setTimer]=useState('-');
const [temp,setTemp]=useState('-');
const [savedPass,setSavedPass]=useState('');

const {theme}=useContext(ThemeContext)
let activeColor=Colors[theme.mode];
const Styles = useThemeStyles(theme);

// sycronisation
  useEffect(() => {
    const interval=setInterval(()=>{
      //checkLoginStatus();
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://2.2.2.2/statewdx';
    
        xhr.onreadystatechange = async() => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
              setErrormsgState(false);
              if(xhr.responseText.split("#")[0]=="on"){
              setLedONe(true);
              setIsEnabled1(true);
              }
              else{
                setLedONe(false);
                setIsEnabled1(false);
                }
              if(xhr.responseText.split("#")[1]=="on"){
              setLedTwo(true);
              setIsEnabled2(true);
              }
              else{
                setLedTwo(false);
                setIsEnabled2(false);
                }
              if(xhr.responseText.split("#")[2]=="on")
              setLedThree(true);
              else
              setLedThree(false);
              if(xhr.responseText.split("#")[3]=="on")
              setStateLed(true);
              else
              setStateLed(false);
              
            } else {
              setErrormsg("لايوجد اتصال بالسيارة!");
              setErrormsgState(true);
            }
            // set the timer
            if(xhr.responseText.split("#")[5]!=undefined)
              setTimer(formatTime(parseInt(xhr.responseText.split("#")[5])));
            else
              setTimer('-');
          }
        };
    
        xhr.open('GET', url, true);
        xhr.timeout = 400; // set the timeout to 2 seconds
        xhr.send();
      });
    },200);
    return ()=> clearInterval(interval);
  }, []);




  const formatTime=(seconds)=> {
    if (isNaN(seconds) || seconds < 0) {
      return "-";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }




  const handleUnLockDown = () => {
    setUnlockActive(true);
    Vibration.vibrate(80);
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://2.2.2.2/open';
    
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
              setErrormsgState(false);
              ////setLedONe(true);
            } else {
              //reject("لايوجد اتصال بالسيارة!");
              setErrormsg("لايوجد اتصال بالسيارة!");
              setErrormsgState(true);
            }
          }
        };
    
        xhr.open('GET', url, true);
        xhr.timeout = 1000; // set the timeout to 2 seconds
        xhr.send();
      });

  }; 
  const handleUnLockUp = () => {
    setUnlockActive(false);
  };

  
  const handleLockDown = () => {
    setLockActive(true);
    Vibration.vibrate(80);
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/lock';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
      });
  }; 
  const handleLockUp = () => {
    setLockActive(false);
  };




  
  const handleGlassUp = () => {
    setGlassActive(false);
    Vibration.vibrate(80);
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/glassUP';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
      });
  }; 

  
  
  const handleGlassDown = () => {
    setGlassActive(true);
    Vibration.vibrate(80);
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/glassDown';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
      });
  }; 

  const handleBoxDown = () => {
    setBoxActive(true);
    Vibration.vibrate(80);
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = 'http://2.2.2.2/trunk';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
          setErrormsgState(false);
        } 
      }
    };
    xhr.open('GET', url, true);
    xhr.timeout = 1000;
    xhr.send();
    });
  }; 
  const handleBoxUp = () => {
    setBoxActive(false);
  };

// when press the run button
  const handlePressIn = () => {
    setPressed(true);
    Vibration.vibrate(80);

    if(!isEnabled1){ //فتح سويج
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://2.2.2.2/switch1On';
    
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
              setErrormsgState(false);
              ////setLedONe(true);
            } else {
              setErrormsg("لايوجد اتصال بالسيارة!");
              setErrormsgState(true);
            }
          }
        };
        xhr.open('GET', url, true);
        xhr.timeout = 1000; // set the timeout to 2 seconds
        xhr.send();
      });
    }

    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/motorOn';
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
  
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
    }); 
  };

  const handlePressOut = () => {
    setPressed(false);
    Vibration.vibrate(80);
    //setLedThree(false);
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/motorOff';
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
  
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
    });
  };

//run the car
const switchOneOn=async()=>{
  setIsEnabled1(previousState => !previousState);
  if (!isEnabled1){
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/switch1On';
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
  
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
    });
}
  else{//switch one off
    setIsEnabled2(false);
    setButtonOneEnabled(true);
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/switch1Off';
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
            setErrormsgState(false);
            ////setLedONe(true);
          } else {
            //reject("لايوجد اتصال بالسيارة!");
            setErrormsg("لايوجد اتصال بالسيارة!");
            setErrormsgState(true);
          }
        }
      };
  
      xhr.open('GET', url, true);
      xhr.timeout = 1000; // set the timeout to 2 seconds
      xhr.send();
    });
                
  }
}// end switch one

  return (
<View style={Styles.container}>
<StatusBar
  backgroundColor={activeColor.mainColor}
  barStyle="light-content"
/>
<ImageBackground
        source={activeColor.dark?require('../assets/bg-dark.jpg'):require('../assets/bg.jpg')}
        style={Styles.backgroundImageStyle}
        resizeMode="stretch"
      >
      <View style={Styles.stateContainer}>
        <View style={[Styles.stateLED,{backgroundColor: stateLed?"green":Colors.darkColor}]}/>
      <View style={Styles.LEDs}>
      <View style={[Styles.led1, ledOne ? Styles.ledOneOn : Styles.ledOneOff]} />
      <View style={[Styles.led3, ledThree ? Styles.ledThreeOn : Styles.ledThreeOff]} />

      </View>
      </View>


     <View style={[Styles.switchContainer,mode? styles.visible : styles.hidden]}>
      <Switch
        trackColor={{ false: '#767577', true: activeColor.secondColor}}
        thumbColor={activeColor.dark?(isEnabled1 ? "#03078f" : '#9AA3A8'):(isEnabled1 ? activeColor.mainColor : '#f4f3f4')}
        ios_backgroundColor="#3e3e3e"
        onValueChange={switchOneOn}
        value={isEnabled1}
        style={Styles.switchOne} // set size
      />

      <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      //disabled={buttonOneEnabled}
      style={[Styles.runbutton,
         {  backgroundColor: pressed ? activeColor.secondColor : activeColor.mainColor,
            top: pressed? 5:0,
            //opacity: buttonOneEnabled? 0.6:1
        }]}
    >
      <Text style={Styles.runButtonText}>
        تشغيل
      </Text>
    </TouchableOpacity>
    </View>
      




<View style={Styles.lockContainer}>
<View style={Styles.row1}>
      <TouchableOpacity
      onPressIn={handleLockDown}
      onPressOut={handleLockUp}
      activeOpacity={1}
      style={[Styles.button,Styles.lockBtn,
         {  backgroundColor: lockActive ? activeColor.secondColor : activeColor.mainColor,
            top: lockActive? 5:0,
        }]}
    >
        <FontAwesome name="lock" size={44} color="#fff" />

    </TouchableOpacity>
    <TouchableOpacity
      onPressIn={handleUnLockDown}
      onPressOut={handleUnLockUp}
      activeOpacity={1}
      style={[Styles.button,
         {  backgroundColor: unlockActive ? activeColor.secondColor : activeColor.mainColor,
            top: unlockActive? 5:0,
        }]}
    >
              <FontAwesome name="unlock" size={44} color="#fff" />

    </TouchableOpacity>
</View>
    
<View style={Styles.row2}>
    <TouchableOpacity
      onPressIn={handleBoxDown}
      onPressOut={handleBoxUp}
      activeOpacity={1}
      style={[Styles.button,
         {  backgroundColor: boxActive ? activeColor.secondColor : activeColor.mainColor}]}
    >
        <Image source={require('../assets/trunk-open.png')} style={{width:60,height:34}}/>

    </TouchableOpacity>

    <TouchableOpacity
      onPressIn={handleGlassDown}
      onPressOut={handleGlassUp}
      activeOpacity={1}
      style={[Styles.button,Styles.glassBtn,
         {  backgroundColor: GlassActive ? activeColor.secondColor : activeColor.mainColor}]}
    >
        <Image source={require('../assets/glass.png')} style={{width:45,height:40}}/>

    </TouchableOpacity>

</View>



      
</View>

<View style={Styles.tempContainer}>
  <Text style={Styles.tempText}>
    {timer}
  </Text>
</View>
<View style={[Styles.errContaner,errormsgState? styles.visible : styles.hidden]}>
  <Text style={Styles.errmsg}>{errormsg}</Text>
</View>
</ImageBackground>
</View>
    );
  };
const styles = StyleSheet.create({
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});
export default Home;
