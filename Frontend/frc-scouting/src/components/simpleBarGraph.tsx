import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

interface Props {
  children?: React.ReactNode;
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
}

function SimpleBar(props: Props) {

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: '',
        data: props.data,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as 'top',
      },
      title: {
        display: false,
        text: 'Bar Chart Example',
      },
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Bar data={data} options={options} />
  );
}

export default SimpleBar;
