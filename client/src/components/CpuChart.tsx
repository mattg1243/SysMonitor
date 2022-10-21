import React, { useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function CpuChart(props): JSX.Element {
  const [cpuPercentage, setCpuPercentage] = useState([76]);

  const data: ChartData<'bar'> = {
    labels: ['%'],
    datasets: [
      {
        data: cpuPercentage,
        borderWidth: 1,
        backgroundColor: cpuPercentage[0] > 50 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        borderColor: cpuPercentage[0] > 50 ? 'rgb(255, 99, 132)' : 'rgb(75, 192, 192)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      
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

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  return <Bar data={data} options={options} height={200} />;
}
