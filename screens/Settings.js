import {useState,useEffect,useContext} from "react";
import {View,Text,StyleSheet, TouchableOpacity,Image,BackHandler} from 'react-native';
import Colors from "../components/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import useThemeStyles from "../components/Styles";
import { ThemeContext } from "../components/ThemeContect";
 const Settings = ({ navigation })=>{
  
  const {theme}=useContext(ThemeContext)
  let activeColor=Colors[theme.mode];
  const Styles = useThemeStyles(theme);
  

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("الرئيسية");
      return true; // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Remove the event listener on unmount
  }, [navigation]);
    return(
    <View 
    style={{...Styles.body,flex:1,alignItems:"center"}}
    >            
      <TouchableOpacity 
      onPress={()=>navigation.navigate("كلمة سر جديدة")}
      style={{...Styles.tochable}}>
                <MaterialCommunityIcons name="form-textbox-password" size={28} color="#fff" />
        <Text style={Styles.tochableColor}>
        تغيير كلمة السر
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("تغيير اسم الشبكة")}
      style={Styles.tochable}>
        <MaterialCommunityIcons name="wifi-cog" size={28} color="#fff" />
        <Text style={Styles.tochableColor}>
        تغيير اسم الشبكة
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("ريموت كُنترول")}
      style={Styles.tochable}>
        {/* <MaterialCommunityIcons name="wifi-cog" size={24} color="#fff" /> */}
        <Image source={require('../assets/remote.png')} style={{width: 35, height: 35,marginVertical:-5}}/>
        <Text style={Styles.tochableColor}>
          ريموت كُنترول
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("فصل بعد مدة")}
      style={Styles.tochable}>
   <MaterialCommunityIcons name="timer-cog" size={30} color="white" />
        <Text style={Styles.tochableColor}>
          فصل الجهاز بعد مدة
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={()=>navigation.navigate("تشغيل تلقائي")}
      style={Styles.tochable}>
        <Image source={require('../assets/auto_start.png')} style={{width: 40, height: 30,marginVertical:-5}}/>
        <Text style={Styles.tochableColor}>
          تشغيل بضغطة واحدة
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("ألوان التطبيق")}
      style={Styles.tochable}>
        {/* <MaterialCommunityIcons name="wifi-cog" size={24} color="#fff" /> */}
        <Ionicons name="color-palette" size={32} color="#fff" style={{marginVertical:-5}} />
        <Text style={Styles.tochableColor}>
          ألوان التطبيق
        </Text>
      </TouchableOpacity>
    
    </View>
    )
}


    

export default Settings;