import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import StyledText from '../../components/StyledText';
import useScreenMode from '../../utilities/screenMode';

interface BtnProps {
  readonly title: string;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
  readonly google?: boolean;
  readonly facebook?: boolean;
  readonly clickable?: boolean;
  readonly margin?: boolean;
}

export default function Btn({ title, onPress, disabled, google, facebook, clickable, margin }: BtnProps) {

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  }

  const { mode } = useScreenMode()

  const calcBackgroundColor = () => {
    // disabled ? mode==='light'? Colors.light['palette-2'] : Colors.dark['palette-2'] : mode==='light'? Colors.light['palette-6'] : Colors.dark['palette-6'],
    if (disabled && mode==='light') {
      return Colors.light['palette-2'];
    } else if (disabled && mode==='dark') {
      return Colors.dark['palette-2'];
    } else if (!disabled && mode==='light') {
      return Colors.light['palette-6'];
    } else if (!disabled && mode==='dark') {
      return Colors.dark['palette-6'];
    }
  }

  if (clickable) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.button, {
            backgroundColor: calcBackgroundColor()
          }, 
          disabled ? styles.disabledButton : {},
          margin ? { marginBottom: 25, marginTop: 35 } : {}
        ]}
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
      <View style={[styles.button, { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',
        backgroundColor: calcBackgroundColor(),
      }, disabled && ( styles.disabledButton )]}>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  disabledButton: {
  },
});
