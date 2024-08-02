import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import StyledText from '../../components/StyledText';

interface BtnProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  google?: boolean;
  facebook?: boolean;
  clickable?: boolean;
}

export default function Btn({ title, onPress, disabled, google, facebook, clickable }: BtnProps) {

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  }

  if (clickable) {
    return (
      
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={[styles.button, disabled && styles.disabledButton]}
        
      >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {google && <Image source={require('../../assets/google.png')} style={{ width: 20, height: 20, marginRight: 10 }} />}
          {facebook && <Image source={require('../../assets/facebook.png')} style={{ width: 20, height: 20, marginRight: 10 }} />}
          <StyledText button disabled={disabled}>
            {`${title}`}
          </StyledText>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={[styles.button, disabled && styles.disabledButton, { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }]}>
        {google && <Image source={require('../../assets/google.png')} style={{ width: 20, height: 20, marginRight: 10 }} />}
        {facebook && <Image source={require('../../assets/facebook.png')} style={{ width: 20, height: 20, marginRight: 10 }} />}
        <StyledText button disabled={disabled}>
          {`${title} ${disabled ? ' - inactivo' : ''}`}
        </StyledText>
        {/* <Text style={[styles.buttonText, disabled && styles.disabledText]}>{`${title} ${disabled ? ' - inactivo' : ''}`}</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    backgroundColor: Colors.light['palette-6'],
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: Colors.light['palette-2'],
    color: Colors.light['palette-5']
  },
  buttonText: {
    color: Colors.light['palette-11'],
    fontSize: 16,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledText: {
    color: Colors.light['palette-5']
  }
});
