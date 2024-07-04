import react,{useState,useContext,useEffect} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import {View,Text,TouchableOpacity,Linking, I18nManager, Image,StyleSheet} from 'react-native';
import Colors from "../components/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



 const About = ()=>{
    const [isEnabled, setIsEnabled] = useState(false);
    const {theme}=useContext(ThemeContext)
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const thumbStyle = {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: isEnabled ? '#fff' : '#000',
        borderColor: isEnabled ? '#000' : '#fff',
        borderWidth: 1,
      };
    return(
    <View 
    style={{...Styles.body,flex:1,alignItems:"center"}}
    >    
    

  <TouchableOpacity  style={{...Styles.tochable, backgroundColor: activeColor.mainColor}}
 onPress={()=>{Linking.openURL("https://acsd.hyantalm.com/pruducts/")}}>
      <Text style={Styles.normalFont}>
      موقعنا الإلكتروني
      </Text>
  <MaterialCommunityIcons name="web" size={30} color="#fff" />
  </TouchableOpacity>
    
  <TouchableOpacity  style={{...Styles.tochable, backgroundColor: activeColor.mainColor}}
 onPress={()=>{Linking.openURL("https://www.facebook.com/profile.php?id=100090287467770")}}>
    <Text style={Styles.normalFont}>
    حسابنا على فيسبوك
    </Text>
    <FontAwesome5 name="facebook" size={30} color="#fff" />
</TouchableOpacity>
 
     <Image source={require("../assets/acsd.png")} 
               style={Styles.acsd}
               resizeMode="contain"
               />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }, 
     thumbOn: {
        width: 30,
        height: 130,
        borderRadius: 30 / 2,
        backgroundColor: "green"
      },
      thumbOff: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: "red"
      },
      switch: {
        transform: [{ scaleX: 2 }, { scaleY: 2 }],
        borderRadius: 20,
        width: 70,
        height: 140,
      },
    
    
    
    
    
  });
export default About