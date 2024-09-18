import { View } from "react-native";
import StyledText from "../StyledText";
import { Colors } from "../../constants/Colors";
import useScreenMode from "../../utilities/screenMode";
import { useEffect, useState } from "react";

interface CalendarProps {
  readonly month: string;
  readonly year: string;
  readonly events: { eventImageURL: string, event_name: string, event_date: string, event_location: string, event_description: string, id: number }[]
}

export default function Calendar(props: CalendarProps) {
  const { month, year } = props;

  // dia 1 de este mes
  const firstDay = new Date(`${year}-${Number(month)}-01`);

  // ultimo dia de este mes
  const lastDay = new Date(`${year}-${Number(month)}-01`);
  lastDay.setMonth(lastDay.getMonth() + 1);
  lastDay.setDate(lastDay.getDate() - 1);

  // obtener el día de la semana del primer día del mes
  const firstDayOfWeek = firstDay.getDay(); // 0 = Domingo, 1 = Lunes, etc.

  // crear el calendario
  const calendar: (Date | null)[] = [];

  let day = new Date(firstDay);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // agregar celdas vacías antes del primer día del mes si es necesario
  if (firstDayOfWeek === 0) {
    for (let i = 0; i < 6; i++) {
      calendar.push(null);
    }
  } else {
    for (let i = 0; i < firstDayOfWeek - 1; i++) {
      calendar.push(null);
    }
  }

  while (day <= lastDay) {
    calendar.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const getMonth = (month: string) => {
    month.length === 1 && (month = `0${month}`);
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
      default:
        return 'Jan';
    }
  }

  const { mode } = useScreenMode()

  const dayNumber = (date: Date) => {
    for (const event of props.events) {

      const eventDate = new Date(event.event_date);

      if (date === null) {
        return (
          <View style={styles.day}>
            <StyledText litle>{''}</StyledText>
          </View>
        )
      } else {
        if (date.getDate() === eventDate.getDate() && date.getMonth() === eventDate.getMonth() && date.getFullYear() === eventDate.getFullYear()) {
          return (
            <View style={[styles.day, { backgroundColor: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }]}>
              <StyledText litle light>{date.getDate()}</StyledText>
            </View>
          )
        }
      }
      return (
        <View style={styles.day}>
          <StyledText litle>{date?.getDate() ? date?.getDate() : ''}</StyledText>
        </View>
      )
    }

  }

  return (
    <View>
      <StyledText subtitle bold mayus>{getMonth(month)}-{year}</StyledText>
      <View style={styles.calendar}>
        {days.map((day, index) => {
          return (
            <View key={index + 1} style={styles.day}>
              <StyledText litle>{day}</StyledText>
            </View>
          )
        })}
        {calendar.map((day, index) => dayNumber(day))}
      </View>
    </View>
  );
}

const styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    with: '50%',
  },
  day: {
    width: '14.28%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  }
}