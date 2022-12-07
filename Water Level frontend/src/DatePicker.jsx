import React, {useState} from 'react';
import MonthYearPicker from 'react-month-year-picker';
import useAsyncFetch from "./useAsyncFetch";
import './App.css';

function DatePicker(props)
{
  let date = props.date;
  const [visible, updateVisible] = useState(false);

  function makeVisible()
  {
    updateVisible(true);
  }

  function pickedMonth(newMonth)
  {
    updateVisible(false);
    props.month(newMonth);
  }

  function pickedYear(newYear)
  {
    props.year(newYear);    
  }

  function toString(month)
  {
    let b = "";
    switch(month)
    {
      case 1: b = "January";
          break;
      case 2: b = "February";
          break;
      case 3: b = "March";
          break;
      case 4: b = "April";
          break;
      case 5: b = "May";
          break;
      case 6: b = "June"; 
          break;
      case 7: b = "July";
          break;
      case 8: b = "August";
          break;
      case 9: b = "September";
          break;
      case 10: b = "October";
          break;
      case 11: b = "November";
          break;
      case 12: b = "December";
          break;
    }

    return b;
  }

  if (visible) 
  { 
    return (
      <div id = "date">
        <button id = "dateButton" onClick={makeVisible}>{toString(date.month) + "  " + date.year}</button>
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeMonth = {pickedMonth}
          onChangeYear  = {pickedYear}
        />
      </div> 
    );
  } 
  else 
  {
    return (
      <button id = "dateButton" onClick={makeVisible}>{toString(date.month) + "  " + date.year}</button>
    )
  }
}

export default DatePicker;