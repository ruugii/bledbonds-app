import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";

interface TextProps {
  text?: string;
  children?: React.ReactNode;
  title?: boolean;
  litle?: boolean;
  xsmall?: boolean;
  subtitle?: boolean;
  bold?: boolean;
  mayus?: boolean;
  underline?: boolean;
  animationChange?: boolean;
  nextText?: string;
  light?: boolean;
  style?: object;
  left?: boolean;
  justify?: boolean;
  transparent?: boolean;
  right?: boolean;
  button?: boolean;
  disabled?: boolean;
  micro?: boolean;
  full?: boolean;
  center?: boolean;
  red?: boolean;
}

export default function StyledText(props: Readonly<TextProps>) {
  const [displayText, setDisplayText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toggleText, setToggleText] = useState<boolean>(false);

  useEffect(() => {
    if (props.animationChange && (props.text || props.nextText)) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
          const textLength = toggleText && props.nextText ? props.nextText.length : props.text!.length;

          // Si estamos eliminando el texto
          if (isDeleting) {
            if (prev > 0) {
              return prev - 1;
            } else {
              setIsDeleting(false);
              setToggleText(prevToggle => !prevToggle);
              return 0;
            }
          } else {
            // Si estamos añadiendo el texto
            if (prev < textLength) {
              return prev + 1;
            } else {
              setIsDeleting(true);
              return textLength;
            }
          }
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [props.animationChange, props.text, props.nextText, toggleText, isDeleting]);

  useEffect(() => {
    if (props.animationChange && (props.text || props.nextText)) {
      const textToDisplay = toggleText && props.nextText ? props.nextText : props.text;
      setDisplayText(textToDisplay!.substring(0, currentIndex));
    }
  }, [currentIndex, toggleText, props.animationChange, props.text, props.nextText]);

  return (
    <Text style={[
      styles.textStyles,
      props.title ? styles.title : {},
      props.subtitle ? styles.subtitle : {},
      props.litle ? styles.little : {},
      props.bold ? styles.bold : {},
      props.underline ? styles.underline : {},
      props.mayus ? styles.mayus : {},
      props.light ? styles.light : {},
      props.left ? styles.left : {},
      props.justify ? styles.justify : {},
      props.style ? props.style : {},
      props.transparent ? { color: 'transparent' } : {},
      props.right ? { textAlign: 'right' } : {},
      props.button ? styles.button : {},
      props.disabled ? styles.disabled : {},
      props.micro ? styles.micro : {},
      props.full ? { width: '100%' } : {},
      props.center ? { textAlign: 'center'} : {},
      props.xsmall ? { fontSize: 15 } : {},
      props.red ? { color: 'red' } : {},
    ]}>
      {props.children ? props.children : displayText}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    color: Colors.light["palette-11"],
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 30,
    textAlign: 'center',
  },
  little: {
    fontSize: 20,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  mayus: {
    textTransform: 'uppercase',
  },
  light: {
    color: Colors.light["palette-1"],
  },
  left: {
    textAlign: 'left',
  },
  justify: {
    textAlign: 'justify',
  },
  button: {
    color: Colors.light['palette-11'],
    fontSize: 16,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    color: Colors.light["palette-5"]
  },
  micro: {
    fontSize: 10,
  }
});
