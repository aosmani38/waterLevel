import React, { useState, useEffect } from 'react';
import './App.css';
import DatePicker from './DatePicker';
import BarChart from './BarChart';
import useAsyncFetch from "./useAsyncFetch";

function App() {
  
  const [buttonState, updateButtonState] = useState(false);
  const [date, setDate] = useState({month: 4, year: 2022});
  const [infoState, setInfo] = useState(false);

  function getInfo(state)
  {
    setInfo(state);
  }
  
  function buttonAction()
  {
    if(buttonState)
      updateButtonState(false);
    else
      updateButtonState(true);
  }

  function setMonth(newMonth)
  {
    let y = date.year;
    setDate({month: newMonth, year: y}); 
  }

  function setYear(newYear)
  {
    let m = date.month;
    setDate({month: m, year: newYear}); 
  }
    
  if(buttonState)
  {
    return (
    <main className="container">
      <div className = "stripe">
          <h1>Water storage in California reservoirs</h1>
      </div>
      <div className= "topSection">
        <div className="text-container">
          <p>
            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </p>
          <p>
            California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
          </p>
          <div className="MoreButton">
            <button id = "moreButton" onClick = {buttonAction}>Read More</button>
          </div>
        </div>
        <div className = "imgContainer">
          <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
          <footer>Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</footer>
        </div>
      </div>
    </main>
  );
  }
  else
  {
    return (
      <main className="container">
        <div className = "stripe">
          <h1>Water storage in California reservoirs</h1>
        </div>
        <div className= "topSection">
          <div className = "text-container">
            <p>
              California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
            </p>
            <p>
              California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </p>
            <div className="MoreButton">
              <button id = "moreButton" onClick = {buttonAction}>Read Less</button>
            </div>
          </div>
          <div className = "imgContainer">
            <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
            <footer>Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.</footer>
          </div>
        </div>
    
        <div className = "bottomSection">
          {/*Chart goes here plz*/}
          <div className = "chart">
            <ChartDisplay date = {date}/>
          </div>
    
          <div className = "info">
            <p>
              Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
            </p>

            <h4>
              Change month:
            </h4>
    
            {/*Date Picker goes here*/}
            <div className = "datePicker">
              <DatePicker  
                date = {date}
                year = {setYear}
                month = {setMonth}
                info = {getInfo}
              />
            </div>
          </div>
        </div>
      </main>
    );    
  }
}

// use this for making data requests
// await sendPostRequest("/query/getData", date)

function ChartDisplay(date)
{
  console.log(date.date);
  console.log("display chart");

  const [info, setInfo] = useState([]);

  useAsyncFetch('query/getList', date.date, thenDo, catchErr);

  function thenDo(result)
  {
    let output = [];
    
    for(let i = 0; i < result.length; i++)
    {
      if(result[i].length == 0)
      {
        output.push(0);
      }
      else
      {
        output.push(result[i][0]['value']);
      }
    }
    console.log(output);
    setInfo(output);
  }

  function catchErr(error)
  {
    console.log(error);    
  }

  if (info) {
  return (
      <BarChart data = {info} />
  )
  } else {
    return (<p>
      loading...
    </p>);
  }
}

export default App;