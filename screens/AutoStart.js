import React,{useState,useContext,useEffect} from "react";
import { ThemeContext } from "../components/ThemeContect";
import useThemeStyles from "../components/Styles";
import { Text, View, Switch,TextInput,TouchableOpacity } from 'react-native'
import Colors from "../components/Colors";

const AutoStart=()=>{
    const {theme}=useContext(ThemeContext);
    let activeColor=Colors[theme.mode];
    const Styles = useThemeStyles(theme);
    const [isEnabled,setIsenabled]=useState(false);
    const [tryValue,setTryValue]=useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [msg,setMsg]=useState('');
    const [sucsess,setsucsess]=useState(false);
    const enableAutoSwitch=()=>{
    setIsenabled(prevState => !prevState);
    setMsg('');
}

useEffect(() => {
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = 'http://2.2.2.2/autoState';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if(xhr.responseText.split("#")[0]=="on"){
              setIsenabled(true);
              setTryValue(parseInt(xhr.responseText.split("#")[1]));
            }
            else{
              setIsenabled(false);
            }
          } else {
            setMsg("لايوجد اتصال!");
            setsucsess(false);
            setIsLoading(false);
          }
        }
      };
      xhr.open('GET', url, true);
      xhr.timeout = 2000; // set the timeout to 2 seconds
      xhr.send();
    });
    },[]);

const setAuto=async ()=>{
    setIsLoading(true);
    try {
      if (tryValue === '' || tryValue === 0) {
        setMsg('يجب أن تدخل قيمة');
        setsucsess(false);
        setIsLoading(false);
        return;
      }
  
      if(isEnabled){
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const url = 'http://2.2.2.2/setAuto?numOfTries='+tryValue+'&state=on';
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  if(xhr.responseText=="auto mode"){
                      setMsg('تم حفظ التغييرات');
                      setsucsess(true);
                      setIsLoading(false);
                  }
              } else {
                setMsg("لايوجد اتصال!");
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
            const url = 'http://2.2.2.2/setAuto?numOfTries=0&state=off';
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(xhr.responseText=="manual mode"){
                        setMsg('تم حفظ التغييرات');
                        setsucsess(true);
                        setIsLoading(false);
                    }
                } else {
                  setMsg("لايوجد اتصال!");
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
                تشغيل السيارة بضغطة واحدة
            </Text>

    <Switch
        trackColor={{ false: '#767577', true: activeColor.secondColor}}
        thumbColor={activeColor.dark?(isEnabled ? "#03078f" : '#9AA3A8'):(isEnabled ? activeColor.mainColor : '#f4f3f4')}
        ios_backgroundColor="#3e3e3e"
        onValueChange={enableAutoSwitch}
        value={isEnabled}
        style={Styles.smalSwitch} // set size
      />
        </View>
        <View style={{backgroundColor:activeColor.bgColor,alignItems:"center",flexDirection:"row-reverse",justifyContent:"space-around",paddingHorizontal:70,direction:"rtl",paddingVertical:20,display:isEnabled?"flex":"none"}} >
            <Text style={{...Styles.normalFont,color:activeColor.fontColor}}>
               عدد محاولات التشغيل
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
    value={tryValue.toString()} // Convert to string
    onChangeText={(text) => {
        // Ensure only numeric values and limit to 3 digits
        const numericValue = text.replace(/[^0-9]/g, ''); 
        const limitedValue = numericValue.slice(0, 3);
        setTryValue(limitedValue);
    }}
    inputMode="numeric"
    maxLength={3} // Set maximum length
/>
        </View>
    <View style={{paddingHorizontal:30,backgroundColor:activeColor.bgColor}}>
    <Text style={{color:sucsess?"green":"red", textAlign:"right",direction:"rtl",marginTop:-10,marginBottom:10}}>{msg}</Text>
        <TouchableOpacity
          style={[ Styles.formButton, isLoading && Styles.loadingLoginButton]}
          onPress={setAuto}
          disabled={isLoading}
        >
          <Text style={Styles.buttonText}>{isLoading ? 'جارِ الحفظ..' : 'حفظ'}</Text>
        </TouchableOpacity>
    </View>
    <View style={{backgroundColor:activeColor.bgColor,height:"100%",alignItems:"center",paddingTop:25}}>
      <Text style={Styles.greenAlert}>
        عند تفعيل هذه الميزة، ستتمكن من تشغيل السيارة بضغطة واحدة على زر التشغيل دون الحاجة لضغط مستمر، سينطفئ "السلف" تلقائياً بعد وصول إشارة اشتغال المحرك.
      </Text>
      <Text style={Styles.danger}>
        ملاحظة مهمة: قبل تفعيل هذه الميزة تأكد جيداً من توصيل سلك إشارة تشغيل المحرك بالجهاز والتي يمكنك الحصول عليها من الدينمو او من حساس الزيت (جوزة الدهن)، وبخلاف ذلك لن ينطفئ "السلف" حتى لو اشتغل المحرك.
      </Text>
            
        </View>
        </View>
    )
}
export default AutoStart;
