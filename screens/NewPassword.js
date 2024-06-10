import react,{useState,useContext} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import {View,Text,StyleSheet,TouchableOpacity, TextInput,Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import Colors from "../components/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
 const NewPassword = ()=>{
    const [showPassword,setShowPassword]=useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [newSSID, setNewSSID] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [msg,setMsg]=useState('');

    const {theme}=useContext(ThemeContext)
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);



    const saveChanges=()=>{
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = 'http://2.2.2.2/networkConfig?pass='+'&ssid=' + newSSID;
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(xhr.responseText=="Password updated"){
                        setMsg('تم تغيير كلمة السر بنجاح😘');
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
    const sendRequest = () => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://2.2.2.2/currentPassword';
      
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
      
          if (oldPassword === '' || newPassword1 === '' || newPassword2 === '' || newSSID === '') {
            setMsg('يجب أن تملأ جميع الحقول');
            setIsLoading(false);
            return;
          }
          else{
          if (response === oldPassword) {
            if(newPassword1===newPassword2){
                // send request to change the password
                saveChanges();
            }else{
                setMsg('إدخالات مختلفة');
            }
            
          } else {
            setMsg('كلمة السر غير صحيحة!');
          }
        }
      
          setIsLoading(false);
        } catch (error) {
          setMsg(error);
          setIsLoading(false);
        }
      };
      
    return(
        <View style={{...Styles.formContainer,...Styles.body,padding:120}}>
        <Text style={Styles.title}>
          اعدادات الشبكة الخاصة بالجهاز
        </Text>

        <Text> </Text>
        <View style={Styles.inputContainer}>
        <View style={{...Styles.loginFieldContainer,paddingLeft:5}}>
      <Icon name="key" size={23} style={{ marginHorizontal: 10 }} color={activeColor.fontColor} />
          <TextInput
            style={{...Styles.textboxtext,flex:1}}
            placeholder="كلمة السر القديمة"
            placeholderTextColor={activeColor.placeHoleder}
            secureTextEntry={showPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
          /></View>
        <View style={Styles.loginFieldContainer}>
        <MaterialCommunityIcons name="form-textbox-password" size={23} color={activeColor.fontColor} />
          <TextInput
            style={{...Styles.textboxtext,flex:1}}
            placeholder="كلمة السر الجديدة"
            placeholderTextColor={activeColor.placeHoleder}
            secureTextEntry={showPassword}
            value={newPassword1}
            onChangeText={setNewPassword1}
            maxLength={30}
          />
          </View>
          <View style={Styles.loginFieldContainer}>
          <MaterialCommunityIcons name="form-textbox-password" size={23} color={activeColor.fontColor} />
          <TextInput
            style={{...Styles.textboxtext,flex:1}}
            placeholder="أعد كتابة كلمة السر الجديدة"
            placeholderTextColor={activeColor.placeHoleder}
            secureTextEntry={showPassword}
            value={newPassword2}
            onChangeText={setNewPassword2}
            maxLength={30}
          />
          </View>
          <View style={Styles.loginFieldContainer}>
          <MaterialCommunityIcons name="wifi-cog" size={23} color="#fff" />
          <TextInput
            style={{...Styles.textboxtext,flex:1}}
            placeholder="اسم جديد للشبكة"
            placeholderTextColor={activeColor.placeHoleder}
            value={newSSID}
            onChangeText={setNewSSID}
            maxLength={30}
          />
          </View>
        <View style={{flexDirection:'row-reverse'}}>
          <TouchableOpacity style={{marginRight:10}}
          onPress={()=>{setShowPassword(!showPassword)}}
          >
          <Ionicons name={showPassword?"eye":"eye-off"} size={24} color={activeColor.fontColor} />
          </TouchableOpacity>

          <TouchableOpacity style={{marginRight:10}}
          onPress={()=>{setOldPassword(''),setNewPassword1(''),setNewPassword2(''),setNewSSID('')}}
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
        <Text style={{color:"orange", position:"absolute",bottom:0,textAlign:"right",direction:"rtl",fontSize:13}}>
        ملحوظة: في حال نسيت كلمة المرور، يمكنك إعادة ضبط الجهاز إلى إعدادات المصنع عن طريق الضغط المستمر على الزر الموجود على الجهاز لمدة خمسة ثوانٍ.
</Text>
      </View>
    )
}





export default NewPassword