import React, { useState, useEffect,useContext } from 'react';
import { ThemeContext } from '../components/ThemeContect';
import useThemeStyles from '../components/Styles';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../components/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../components/Styles';
const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [showPassword,setShowPassword]=useState(true);
  const [msg,setMsg]=useState('');

  const {theme,setUserName}=useContext(ThemeContext)
  let activeColor=Colors[theme.mode];
  const Styles = useThemeStyles(theme);
  //to disable go back
  BackHandler.addEventListener('hardwareBackPress', function() {return true})

 
  const sendRequest = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://192.168.4.1/passwdx';
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            if(username=="deyaa" && password=="1300"){ // for demo login
              setMsg('');
              setPassword('');
              setUsername('');
              setUserName(username); //in app.js
              AsyncStorage.setItem('isloggedin','true');
              AsyncStorage.setItem('devPass',"0000");
              AsyncStorage.setItem('userName',username);
              setIsLoading(false);
              navigation.navigate("الرئيسية");
            }
            reject("لايمكن الاتصال بالسيارة!");
          }
        }
      };
  
      xhr.open('GET', url, true);
      xhr.timeout = 2000; // set the timeout to 2 seconds
      xhr.send();
    });
  };
  

  const handleLogin = async () => {
    setIsLoading(true);
  
    try {
      const response = await sendRequest();
      setResponseText(response);
  
      if (password === '') {
        setMsg('الرجاء إدخال كلمة السر الخاصة بالجهاز');
        setIsLoading(false);
        return;
      }
  
      if (response === password) {
        setMsg('');
        setPassword('');
        setUsername('');
        setUserName(username); //in app.js
        AsyncStorage.setItem('isloggedin','true');
        AsyncStorage.setItem('devPass',password.toString());
        AsyncStorage.setItem('userName',username);
        navigation.navigate("الرئيسية");
      } else {
        setMsg('كلمة السر غير صحيحة!');
      }
        setIsLoading(false);
    } catch (error) {
      setMsg(error);
      setIsLoading(false);
    }
  };
  const handleLoginG=()=>{
    setMsg('');
    setPassword('');
    setUsername('');
    setUserName(username); //in app.js
    AsyncStorage.setItem('isloggedin','true');
    AsyncStorage.setItem('devPass',"0000");
    AsyncStorage.setItem('userName',username);
    setIsLoading(false);
    navigation.navigate("الرئيسية");
  }
  
  return (
    <View style={{...Styles.formContainer,...Styles.body}}>
      <Text style={Styles.title}>
        تسجيل الدخول
      </Text>
      <View style={Styles.inputContainer}>
      <View style={Styles.loginFieldContainer}>
      <Icon name="user" size={23} style={{ marginHorizontal: 10 }} color={activeColor.fontColor} />
        <TextInput
          style={{...Styles.textboxtext,flex:1}}
          placeholder="اسم المستخدم (اختياري)"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        </View>
        <View style={Styles.loginFieldContainer}>
      <Icon name="key" size={23} style={{ marginHorizontal: 10 }} color={activeColor.fontColor} />
        <TextInput
          style={{...Styles.textboxtext,flex:1}}
          placeholder="كلمة السر الخاصة بالجهاز"
          placeholderTextColor="#aaa"
          secureTextEntry={showPassword}
          value={password}
          onChangeText={setPassword}
        />
        </View>

<View style={{flexDirection:'row-reverse'}}>
          <TouchableOpacity style={{marginRight:10}}
          onPress={()=>{setShowPassword(!showPassword)}}
          >
          <Ionicons name={showPassword?"eye":"eye-off"} size={24} color={activeColor.fontColor} />
          </TouchableOpacity>

          <TouchableOpacity style={{marginRight:10}}
          onPress={()=>{setPassword(''),setUsername('')}}
          >
          <Ionicons name="close-sharp" size={24} color={activeColor.fontColor} />
          </TouchableOpacity>
          </View>

        <Text style={{color:"red"}}>{msg}</Text>
      </View>

      <TouchableOpacity
        style={[Styles.formButton, isLoading && Styles.loadingLoginButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={Styles.buttonText}>{isLoading ? 'جارِ تسجيل الدخول..' : 'تسجيل الدخول'}</Text>
      </TouchableOpacity>

<View>
  <Text> </Text>
  <Text> </Text>
  <Text> </Text>
</View>
      <TouchableOpacity
        onPress={handleLoginG}
      >
        <Text style={{color:activeColor.fontColor, fontWeight:"bold"}}>دخول كضيف</Text>
      </TouchableOpacity>
    </View>
  );
};














export default LoginScreen;
