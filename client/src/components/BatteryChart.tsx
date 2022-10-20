import React, { useState, useEffect } from 'react';
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
// component specific types
type LabelOptions = '6hr' | '5hr' | '4hr' | '3hr' | '2hr' | '1hr' | 'Now';
type Labels = Array<LabelOptions>;

export default function BatteryChart(): JSX.Element {
  // state for the battery percentage
  const [batteryPercentage, setBatterPercentage] = useState([100, 90, 80, 70, 60, 50, 40, 30, 20, 10])
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
  const options: ChartOptions = {
    responsive: true,
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
  // print out the data on mount so i can see the format
  useEffect(() => {
    console.log(data.datasets)
  })
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  return <Line data={data} options={options} height={200} />;
}
