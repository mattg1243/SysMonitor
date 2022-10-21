import React, { useState } from 'react';
import useInterval from './hooks/useInterval';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function CpuChart(props): JSX.Element {
  const [cpuPercentage, setCpuPercentage] = useState<number>(0);

  const data: ChartData<'bar'> = {
    labels: ['%'],
    datasets: [
      {
        data: [cpuPercentage],
        borderWidth: 1,
        // when cpu usage goes above 50 percent, bar chart will turn red
        backgroundColor: cpuPercentage[0] > 50 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: cpuPercentage[0] > 50 ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
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

  const getCpuData = async () => {
    try {
      let cpuData = await window.api.getCpuPercentage();
      setCpuPercentage(100 - cpuData);
      // console.log('CPU data from Electron: ' + cpuData);
    } catch (err) {
      console.error(err.message);
    }
  };
  // retrieve cpu data every half second
  useInterval(getCpuData, 1000);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  return <Bar data={data} options={options} height={200} />;
}
