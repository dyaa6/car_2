import {useContext} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import { Text, View,TouchableWithoutFeedback } from 'react-native'
import Styles from '../components/Styles'
import Colors from "../components/Colors";
function Theme() {
  const {theme,updateTheme}=useContext(ThemeContext)
  let activeColor=Colors[theme.mode];
  const Styles = useThemeStyles(theme);

  return (
    <View style={{...Styles.rectangleContainer,...Styles.body}}>
          
    <TouchableWithoutFeedback onPress={()=>updateTheme("color1")}>
      <View style={{...Styles.rectangle,backgroundColor:"#075e54"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color2")}>
      <View style={{...Styles.rectangle,backgroundColor:"#f30826"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color3")}>
      <View style={{...Styles.rectangle,backgroundColor:"#3c008b"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color4")}>
      <View style={{...Styles.rectangle,backgroundColor:"purple"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color5")}>
      <View style={{...Styles.rectangle,backgroundColor:"blue"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color6")}>
      <View style={{...Styles.rectangle,backgroundColor:"#f1831d"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color7")}>
      <View style={{...Styles.rectangle,backgroundColor:"#d5342b"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color8")}>
      <View style={{...Styles.rectangle,backgroundColor:"#e9118f"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color9")}>
      <View style={{...Styles.rectangle,backgroundColor:"#5fa505"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color10")}>
      <View style={{...Styles.rectangle,backgroundColor:"#4272f1"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color11")}>
      <View style={{...Styles.rectangle,backgroundColor:"#eee428"}}></View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={()=>updateTheme("color12")}>
      <View style={{...Styles.rectangle,backgroundColor:"black"}}></View>
    </TouchableWithoutFeedback>
  </View>
  )
}

export default Theme