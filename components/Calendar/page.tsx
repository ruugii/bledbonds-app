import { View } from "react-native";
import StyledText from "../StyledText";
import { useEffect } from "react";
import { Colors } from "../../constants/Colors";

interface CalendarProps {
  month: string;
  year: string;
  events: { eventImageURL: string, event_name: string, event_date: string, event_location: string, event_description: string, id: number }[]
}

export default function Calendar(props: CalendarProps) {
  const { month, year } = props;

  // dia 1 de este mes
  const firstDay = new Date(`${year}-${Number(month)}-01`);

  // ultimo dia de este mes
  const lastDay = new Date(`${year}-${Number(month)}-01`);
  lastDay.setMonth(lastDay.getMonth() + 1);
  lastDay.setDate(lastDay.getDate() - 1);

  // crear el calendario
  const calendar = [];
  let day = new Date(firstDay);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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

  const dayNumber = (date: Date) => {
    console.log(props.events);
    
    for (let i = 0; i < props.events.length; i++) {
      
      const eventDate = new Date(props.events[i].event_date);
      console.log('eventDate', eventDate.getMonth());
      console.log('eventDate', date.getMonth());

      if (date.getDate() === eventDate.getDate() && date.getMonth() === eventDate.getMonth() && date.getFullYear() === eventDate.getFullYear()) {
        return (
          <View style={[styles.day, { backgroundColor: Colors.light["palette-11"] }]}>
            <StyledText litle light>{date.getDate()}</StyledText>
          </View>
        )
      }
    }
    return (
      <View style={[styles.day]}>
        <StyledText litle>{date.getDate()}</StyledText>
      </View>
    )
  }

  return (
    <View>
      <StyledText subtitle bold mayus>{getMonth(month)}-{year}</StyledText>
      <View style={styles.calendar}>
        {days.map((day, index) => {
          return (
            <View key={index} style={[styles.day]}>
              <StyledText litle>{day}</StyledText>
            </View>
          )
        })}
        {calendar.map((day, index) => {
          return dayNumber(day)
        })}
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