
// @flow

/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from "react";
import moment from "moment";
import classNames from "classnames";
import { LeftChevron } from "../icons/LeftChevron";
import { RightChevron } from "../icons/RightChevron";
import type { Props } from "./types";

const dayNames = [
  { name: "Su" }, { name: "Mo" }, { name: "Tu" }, { name: "We" }, { name: "Th" }, { name: "Fr" }, { name: "Sa" }
];

const Day = ({ day, selectHandler, selected }:Props) => (
  <span
    className={classNames("p4 calendar__day centered", {
      calendar__day_today: day.isToday,
      calendar__day_inactive: !day.isCurrentMonth,
      calendar__day_active: day.date.isSame(selected)
    })}
    onClick={() => selectHandler(day)}
  >
    {day.number}
  </span>

);

const Week = ({
  date, month, selected, selectHandler,
}:Props) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), "day"),
      date
    };
    days.push(day);
    date = date.clone();
    date.add(1, "day");
  }
  return (
    <div className="aic calendar__week">
      {days.map((day) => <Day day={day} selectHandler={selectHandler} selected={selected} />)}
    </div>
  );
};

const Calendar = ({ className }:Props) => {
  const [month, setMonth] = useState(moment());
  const [selected, setSelected] = useState(moment().startOf("day"));
  const [rendering, setRenderCount] = useState(false);

  const toPrevMonthHandler = () => {
    setMonth(month.subtract(1, "month"));
    setRenderCount(!rendering);
  };
  const toNextMonthHandler = () => {
    setMonth(month.add(1, "month"));
    setRenderCount(!rendering);
  };

  const selectDayHandler = (day) => {
    setSelected(day.date);
    setMonth(day.date.clone());
  };
  const renderWeeks = () => {
    const weeks = [];
    let done = false;
    const date = month.clone().startOf("month").add("w" - 1).day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={month}
          selectHandler={(day) => selectDayHandler(day)}
          selected={selected}
        />
      );
      date.add(1, "w");
      count += 1;
      done = count > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  };
  const calendarClassName = classNames("calendar", className);
  return (
    <section className={calendarClassName}>
      <header className="calendar__header aic jcsb">
        <button className="pure-btn calendar__arrow" onClick={toPrevMonthHandler}><LeftChevron /></button>
        <span className="c1 fw-semi-bold calendar__month">{month.format("MMMM YYYY")}</span>
        <button className="pure-btn calendar__arrow" onClick={toNextMonthHandler}><RightChevron /></button>
      </header>
      <div className="aic">
        {dayNames.map(({ name }) => (<span className="c4 fw-bold calendar__day calendar__day_acent centered">{name}</span>))}
      </div>
      {renderWeeks()}
    </section>
  );
};

export default Calendar;
