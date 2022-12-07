import React from "react";
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//function BarChart({ chartData }, { options }) {
function BarChart(props) {
  
  const cityName = new Map();
  cityName.set(0,'Shasta');
  cityName.set(1,'Ororville');
  cityName.set(2,'Trinity Lake');
  cityName.set(3,'New Melones');
  cityName.set(4,'San Luis');
  cityName.set(5,'Don Pedro');
  cityName.set(6,'Berryessa');

  const totalCap = new Map();
  totalCap.set(0,'4552000');
  totalCap.set(1,'3537577');
  totalCap.set(2,'2447650');
  totalCap.set(3,'2400000');
  totalCap.set(4,'2041000');
  totalCap.set(5,'2030000');
  totalCap.set(6,'1602000');

  let curVolObj = {label: "Current Volume", data: props.data, backgroundColor: 'rgb(66,145,152)'}
  let capVolObj = {label: "Capacity Volume",data: [], backgroundColor: 'rgb(120,199,227)'}
  let labels = [];
  for (let i=0; i<7; i++) {
    labels.push(cityName.get(i));
    capVolObj.data.push(totalCap.get(i));
  }
  let userData = {};
  userData.labels = labels;
  userData.datasets = [curVolObj, capVolObj];
  

  let options = {
  plugins: {
    title: {
      display: false,
      text: 'Water Storage in California Reserviors',
    },
    legend: {
      display: false
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked:true,
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        callback: function(value) {
          return value / 100000
        }
      },
      grid: {
        display: false
      }
    }
  }
};
  

  return <Bar data={userData} options={options} />;
}


export default BarChart;