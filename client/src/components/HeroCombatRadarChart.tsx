import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface HeroCombatRadarChartProps {
  data: {
    tank: number;
    skills: number;
    mobility: number;
    control: number;
    support: number;
    precision: number;
  };
}

const HeroCombatRadarChart: React.FC<HeroCombatRadarChartProps> = ({ data }) => {
  const chartData = {
    labels: ['Tank', 'Skills', 'Mobility', 'Control', 'Support', 'Precision'],
    datasets: [
      {
        data: [
          data.tank,
          data.skills,
          data.mobility,
          data.control,
          data.support,
          data.precision
        ],
        backgroundColor: "rgba(230, 175, 74, 0.5)",
        borderColor: "rgba(230, 175, 74, 0.5)",
        pointBackgroundColor: "rgb(230, 175, 74)",
        pointRadius: 1,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "#ccc"
        },
        grid: {
          color: "#ccc"
        },
        pointLabels: {
          color: "#fff"
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
          stepSize: 20,
        }
      }
    },
    plugins: {
      legend: { display: false },
    }
  };

  return <Radar data={chartData} options={options} />;
};

export default HeroCombatRadarChart;