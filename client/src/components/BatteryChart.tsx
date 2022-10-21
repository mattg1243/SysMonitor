import React, { useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useInterval from './hooks/useInterval';
// component specific types
type LabelOptions = '6hr' | '5hr' | '4hr' | '3hr' | '2hr' | '1hr' | 'Now';
type Labels = Array<LabelOptions>;

export default function BatteryChart(): JSX.Element {
  // state for the battery percentage
  const [batteryPercentage, setBatteryPercentage] = useState([]);
  // labels for the X axis of the Battery Chart
  const labels: Labels = ['6hr', '5hr', '4hr', '3hr', '2hr', '1hr', 'Now'];
  // data object for the Line Chart component prop
  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: batteryPercentage,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  // config
  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        max: 100,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  const getBatteryPercentage = async () => {
    // battery data will be fetched every minute and the max length
    // of data will be 6hrs, so our data array should be no longer that 360
    let updatedData = [...batteryPercentage];
    const newDataPoint = await window.api.getBatData();
    // check to see if we need to remove the oldes data point
    if (updatedData.length > 360) {
      delete updatedData[0];
    }
    // push our new data point to the end of the array
    updatedData.push(newDataPoint);
    // update our state
    setBatteryPercentage(updatedData);
  };
  // fetch battery data every second for testing
  useInterval(getBatteryPercentage, 6000);
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  return <Line data={data} options={options} height={200} />;
}
