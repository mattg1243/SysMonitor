import React from 'react';
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
import { faker } from '@faker-js/faker';

type LabelOption = '6hr' | '5hr' | '4hr' | '3hr' | '2hr' | '1hr' | 'Now';
type Labels = Array<LabelOption>;
// chart will be passed data from root component upon useInterval hook call
type BatteryChartProps = { percentage: number };
export default function BatteryChart(props: BatteryChartProps): JSX.Element {
  // mock data to test rendering and scale
  // const data: ChartData<'line'> = {
  //   labels: [1, 2, 3, 4, 5],
  //   datasets: [
  //     {
  //       data: [20, 40, 60, 80, 100],
  //     },
  //   ],
  // };
  const labels: Labels = ['6hr', '5hr', '4hr', '3hr', '2hr', '1hr', 'Now'];

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
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
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  return <Line data={data} options={options} height={200} />;
}
