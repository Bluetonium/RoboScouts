import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, Title);

interface Props {
  children?: React.ReactNode;
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
}


function SimpleDonut(props: Props) {

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
      plugins: {
          legend: {
              position: 'top' as 'top',
          },
          title: {
              display: false,
              text: 'Doughnut Chart',
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
      }
  };

  return (
    <Doughnut data={data} options={options} />
  );
}

export default SimpleDonut;