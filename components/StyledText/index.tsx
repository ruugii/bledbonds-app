import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/Colors";
import useScreenMode from "../../utilities/screenMode";

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
      const textLength = toggleText && props.nextText ? props.nextText.length : props.text!.length;

      const updateIndex = () => {
        setCurrentIndex((prev) => {
          if (isDeleting) {
            if (prev > 0) return prev - 1;
            setIsDeleting(false);
            setToggleText(!toggleText);
            return 0;
          } else if (prev < textLength) {
            return prev + 1;
          } else {
            setIsDeleting(true);
            return textLength;
          }
        });
      };

      const interval = setInterval(updateIndex, 800);

      return () => clearInterval(interval);
    }
  }, [props.animationChange, props.text, props.nextText, toggleText, isDeleting]);

  useEffect(() => {
    if (props.animationChange && (props.text || props.nextText)) {
      const textToDisplay = toggleText && props.nextText ? props.nextText : props.text;
      setDisplayText(textToDisplay!.substring(0, currentIndex));
    }
  }, [currentIndex, toggleText, props.animationChange, props.text, props.nextText]);

  const { mode } = useScreenMode();

  const getStyle = () => {
    const baseStyles = [
      getModeStyles(),
      getTextStyles(),
      getColorStyles(),
      getAlignmentStyles(),
      getSizeStyles(),
      props.style
    ];

    return baseStyles.filter(Boolean);
  };

  const getModeStyles = () => {
    return mode === 'light' ? styles.textStyles : styles.darkTextStyles;
  };

  const getTextStyles = () => {
    return [
      props.title && styles.title,
      props.subtitle && styles.subtitle,
      props.litle && styles.little,
      props.bold && styles.bold,
      props.underline && styles.underline,
      props.mayus && styles.mayus,
    ];
  };

  const getColorStyles = () => {
    return [
      props.light ? { color: mode === 'light' ? Colors.light["palette-1"] : Colors.dark["palette-1"] } : { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
      props.transparent && { color: 'transparent' },
      props.button && [
        styles.button,
        {
          color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
        },
      ],
      props.disabled && {
        color: mode === 'light' ? Colors.light["palette-5"] : Colors.dark["palette-5"],
      },
      props.red && { color: 'red' },
    ];
  };

  const getAlignmentStyles = () => {
    return [
      props.left && styles.left,
      props.justify && styles.justify,
      props.right && { textAlign: 'right' },
      props.center && { textAlign: 'center' },
      props.full && { width: '100%' },
    ];
  };

  const getSizeStyles = () => {
    if (props.micro) return styles.micro;
    if (props.xsmall) return { fontSize: 15 };
    return null;
  };

  return (
    <Text style={getStyle()}>
      {props.children ? props.children : displayText}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    color: Colors.light["palette-11"],
  },
  darkTextStyles: {
    color: Colors.dark["palette-11"],
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
  left: {
    textAlign: 'left',
  },
  justify: {
    textAlign: 'justify',
  },
  button: {
    fontSize: 16,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micro: {
    fontSize: 10,
  }
});
