import React, { useState, useEffect } from 'react';
import useInterval from './hooks/useInterval';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function MemChart(props): JSX.Element {
  const [memPercentage, setMemPercentage] = useState<number>(0);

  const data: ChartData<'bar'> = {
    labels: ['%'],
    datasets: [
      {
        data: [memPercentage],
        borderWidth: 1,
        // when cpu usage goes above 50 percent, bar chart will turn red
        backgroundColor: memPercentage[0] > 50 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: memPercentage[0] > 50 ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
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

  const getMemData = async () => {
    try {
      let cpuData = await window.api.getMemPercentage();
      setMemPercentage(cpuData);
      // console.log('CPU data from Electron: ' + cpuData);
    } catch (err) {
      console.error(err.message);
    }
  };
  // retrieve mem data every second
  useInterval(getMemData, 1000);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  return <Bar data={data} options={options} height={200} />;
}
