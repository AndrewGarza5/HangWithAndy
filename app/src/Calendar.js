import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import './styles/calendar.css'
import {v4 as uuidV4} from 'uuid'


const Calendar = ({ onCalendarDayClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));

      document.getElementById('prev-icon').style.color = '#eca90d'
      setTimeout(() => {
        document.getElementById('prev-icon').style.color = 'white'
      }, 250)
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));

      document.getElementById('next-icon').style.color = '#eca90d'
      setTimeout(() => {
        document.getElementById('next-icon').style.color = 'white'
      }, 250)
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    onCalendarDayClick(day, dayStr)
    // setSelectedDate(day);
    // showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMMM";
    // console.log("selected day", selectedDate);
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          {/* <div className="icon" onClick={() => changeMonthHandle("prev")}>
            prev month
          </div> */}
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          {/* <div className="icon" onClick={() => changeMonthHandle("next")}>next month</div> */}
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    days.push(
      <div className="col col-center" key={uuidV4()}>
        M
      </div>
    );
    days.push(
      <div className="col col-center" key={uuidV4()}>
        T
      </div>
    );
    days.push(
      <div className="col col-center" key={uuidV4()}>
        W
      </div>
    );
    days.push(
      <div className="col col-center" key={uuidV4()}>
        Th
      </div>
    );
    days.push(
      <div className="col col-center" key={uuidV4()}>
        F
      </div>
    );
    days.push(
      <div className="col col-center" key={uuidV4()}>
        S
      </div>
    );
    days.push(
      <div className="col col-center" key={uuidV4()}>
        Su
      </div>
    );
    return <div className="days row-weekdays">{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={(e) => {
              const dayStr = format(cloneDay, "cccc - MMM dd"); //modify day string 
              e.target.style.backgroundColor = '#eca90d'
              setTimeout(() => {
                e.target.style.backgroundColor = ''
              }, 250)

              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <div className="calendar-arrows-container">
        <div id='prev-icon' className="calendar-arrows-single-arrow" onClick={() => changeWeekHandle("prev")}>
          &#x2190; 
        </div>
        <div id='next-icon' className="calendar-arrows-single-arrow" onClick={() => changeWeekHandle("next")}>
          &#x2192;
        </div>
        {/* <div className="col col-start">
          <div id='prev-icon' className="icon" onClick={() => changeWeekHandle("prev")}>
              &#x2190; 
          </div>
        </div>
        <div className="col col-end">
          <div id='next-icon' className="icon" onClick={() => changeWeekHandle("next")}>
             &#x2192;
          </div>
        </div> */}
      </div>
    );
  };
  return (
    <div className="calendar">
      {renderHeader()}
      {renderFooter()}

      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
