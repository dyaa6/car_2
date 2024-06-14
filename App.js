import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, I18nManager } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';


import Home from './screens/Home';
import About from './screens/About';
import Colors from './components/Colors';
import Settings from './screens/Settings';
import NewPassword from './screens/NewPassword';
import Remote from './screens/RemoteControl';
import Questions from './screens/Questions';
import Theme from './screens/Theme';
import Timer from './screens/Timer';
import AutoStart from './screens/AutoStart';
import { ThemeContext } from './components/ThemeContect';
import { storeData, getData } from './components/asyncSrorage';
import checkAndUpdate from './components/UpdateChecker';

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { activeColor } = props;
  return (
    <View style={{ flex: 1, backgroundColor: activeColor.mainColor }}>
      <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>
          My Car
        </Text>
      </View>
      <DrawerItemList {...props} />
    </View>
  );
}
export default function App() {
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch('https://acsd.hyantalm.com/CarAppUpdate2.json');
        const data = await response.json();
        const appVersion = '3.0';
        checkAndUpdate(appVersion, data.CurrentVersion);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    checkForUpdates();
  }, []);

  const [theme, setTheme] = useState({ mode: "color3" });
  const activeColor = Colors[theme.mode];

  const updateTheme = (newTheme = "color1") => {
    setTheme({ mode: newTheme });
    storeData("appTheme", newTheme);
  };

  const retrieveTheme = async () => {
    try {
      const storedTheme = await getData("appTheme");
      if (storedTheme) updateTheme(storedTheme);
    } catch (e) {
      console.error('Error retrieving theme:', e);
    } 
  };

  useEffect(() => {
    retrieveTheme();
  }, []);

  return (
   <ThemeContext.Provider value={{ theme, updateTheme }}>
      <NavigationContainer>
         <Drawer.Navigator
          initialRouteName='Home'
          drawerContent={props => <CustomDrawerContent {...props} activeColor={activeColor} />}
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: activeColor.mainColor, borderBottomEndRadius: 20, borderBottomStartRadius: 20 },
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: "#fff",
            drawerStyle: { marginTop: 0 },
            headerTitleStyle: { color: "#fff", fontWeight: "bold" },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            drawerPosition: 'right',
          }}
        >
           <Drawer.Screen name="الرئيسية" component={Home}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ),
            }} />
         
          <Drawer.Screen name="الإعدادات" component={Settings}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
              swipeEnabled: true,
            }} />
          <Drawer.Screen name="اعدادات الشبكة" component={NewPassword} 
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="reload" size={24} color={color} />
              ),
              swipeEnabled: true,
              drawerItemStyle: { display: 'none' }
            }} />
          <Drawer.Screen name="ريموت كُنترول" component={Remote}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="reload" size={24} color={color} />
              ),
              swipeEnabled: true,
              drawerItemStyle: { display: 'none' }
            }} />
          <Drawer.Screen name="فصل بعد مدة" component={Timer}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="reload" size={24} color={color} />
              ),
              swipeEnabled: true,
              drawerItemStyle: { display: 'none' }
            }} />
          <Drawer.Screen name="تشغيل تلقائي" component={AutoStart}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="reload" size={24} color={color} />
              ),
              swipeEnabled: true,
              drawerItemStyle: { display: 'none' }
            }} />
          <Drawer.Screen name="ألوان التطبيق" component={Theme}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="reload" size={24} color={color} />
              ),
              swipeEnabled: true,
              drawerItemStyle: { display: 'none' }
            }} />
          <Drawer.Screen name="الأسئلة الشائعة" component={Questions}
            options={{
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="question-circle" size={24} color={color} />
              ),
              swipeEnabled: true,
            }} />
          <Drawer.Screen name="إتصل بنا" component={About} 
            options={{
              drawerIcon: ({ color, size }) => (
                <Entypo name="info" size={24} color={color} />
              ),
              swipeEnabled: true,
            }} /> 
        </Drawer.Navigator>
      </NavigationContainer>
     </ThemeContext.Provider>
  );
}
