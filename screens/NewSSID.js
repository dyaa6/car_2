import react,{useState,useContext} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import {View,Text,StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../components/Colors";
 const NewSSID = ({ navigation })=>{
    const [showPassword,setShowPassword]=useState(true);
    const [newSSID, setNewSSID] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [msg,setMsg]=useState('');

    const {theme}=useContext(ThemeContext)
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);
    

    const changeTheSSID=()=>{
        
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = 'http://192.168.4.1/statewdx';
    
        xhr.onreadystatechange = async() => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
              
              if(xhr.responseText.split("#")[3]=="on")
              setMsg('يجب أن تطفئ السيارة أولاً قبل أن تتمكن من تغيير اسم الشبكة!')
              else
              {
                            new Promise((resolve, reject) => {
                                const xhr = new XMLHttpRequest();
                                const url = 'http://192.168.4.1/newssidwdx?value='+newSSID;
                                xhr.onreadystatechange = () => {
                                if (xhr.readyState === 4) {
                                    if (xhr.status === 200) {
                                        if(xhr.responseText=="New SSID updated"){
                                            setNewSSID('');
                                            setPassword('')
                                            setMsg('');
                                            navigation.navigate("الرئيسية");
                                        }
                                    } else {
                                    setMsg("لايمكن الاتصال بالسيارة!");
                                    }
                                }
                                };
                            
                                xhr.open('GET', url, true);
                                xhr.timeout = 2000; // set the timeout to 2 seconds
                                xhr.send();
                            });
              }
              
            } else {
              setMsg("لا يمكن الإتصال بالسيارة");
            }
          }
        };
    
        xhr.open('GET', url, true);
        xhr.timeout = 400; // set the timeout to 2 seconds
        xhr.send();
      });



     
    }
    const sendRequest = () => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://192.168.4.1/passwdx';
      
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                resolve(xhr.responseText);
              } else {
                reject("لايمكن الاتصال بالسيارة!");
              }
            }
          };
      
          xhr.open('GET', url, true);
          xhr.timeout = 2000; // set the timeout to 2 seconds
          xhr.send();
        });
      };

    const handleChange = async () => {
        setIsLoading(true);
      
        try {
          const response = await sendRequest();
          setResponseText(response);
      
          if (newSSID === '' || password === '') {
            setMsg('يجب أن تملأ جميع الحقول');
            setIsLoading(false);
            return;
          }
      
          if (response === password) {
                // send request to change the ssid name
                changeTheSSID();
           
          } else {
            setMsg('كلمة السر غير صحيحة!');
          }
            setIsLoading(false);
        } catch (error) {
          setMsg(error);
          setIsLoading(false);
        }
      };
      
    return(
        <View style={{...Styles.formContainer,...Styles.body}}>
        <Text style={Styles.title}>
          تغيير اسم الشبكة
        </Text>
        <View style={Styles.inputContainer}>
        <View style={Styles.loginFieldContainer}>
      <Icon name="wifi" size={23} style={{ marginHorizontal: 10 }} color={activeColor.fontColor} />
        
          <TextInput
            style={{...Styles.textboxtext,flex:1}}
            placeholder="أدخل اسم جديد للشبكة"
            placeholderTextColor={activeColor.placeHoleder}
            secureTextEntry={false}
            value={newSSID}
            onChangeText={setNewSSID}
          />
          </View>
          <View style={Styles.loginFieldContainer}>
      <Icon name="key" size={23} style={{ marginHorizontal: 10 }} color={activeColor.fontColor} />
        
          <TextInput
            style={{...Styles.textboxtext,flex:1}}
            placeholder="كلمة السر الخاصة بالجهاز"
            placeholderTextColor={activeColor.placeHoleder}
            secureTextEntry={showPassword}
            value={password}
            onChangeText={setPassword}
            maxLength={30}
          /></View>

        <View style={{flexDirection:'row-reverse'}}>
          <TouchableOpacity style={{marginRight:10}}
          onPress={()=>{setShowPassword(!showPassword)}}
          >
          <Ionicons name={showPassword?"eye":"eye-off"} size={24} color={activeColor.fontColor} />
          </TouchableOpacity>

          <TouchableOpacity style={{marginRight:10}}
          onPress={()=>{setNewSSID(''),setPassword('')}}
          >
          <Ionicons name="close-sharp" size={24} color={activeColor.fontColor} />
          </TouchableOpacity>
          </View>
          <Text style={{color:"red"}}>{msg}</Text>
        </View>
  
        <TouchableOpacity
          style={[Styles.formButton, isLoading && Styles.loadingLoginButton]}
          onPress={handleChange}
          disabled={isLoading}
        >
          <Text style={Styles.buttonText}>{isLoading ? 'جارِ حفظ التغييرات..' : 'حفظ التغييرات'}</Text>
        </TouchableOpacity>
      </View>
    )
}





export default NewSSID