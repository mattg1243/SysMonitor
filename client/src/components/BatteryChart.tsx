import React from 'react';
import { ChartData } from 'chart.js';
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
import { faker } from '@faker-js/faker';

export default function BatteryChart(props): JSX.Element {
  // mock data to test rendering and scale
  // const data: ChartData<'line'> = {
  //   labels: [1, 2, 3, 4, 5],
  //   datasets: [
  //     {
  //       data: [20, 40, 60, 80, 100],
  //     },
  //   ],
  // };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // config
  const options = {
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
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  return <Line data={data} options={options} />;
}
