import React, { useState } from 'react';
import { TouchableOpacity,View, Text, StyleSheet } from 'react-native';

const RunningButton = ({ onPressIn, onPressOut, title }) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    onPressIn();
  };

  const handlePressOut = () => {
    setPressed(false);
    onPressOut();
  };

  return (
    <View>
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.runbutton, { backgroundColor: pressed ? '#9b59b6' : '#3498db' }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  runbutton: {
    borderRadius: 25,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RunningButton;
