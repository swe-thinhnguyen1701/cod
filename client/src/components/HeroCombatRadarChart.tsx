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
import HeroStats from '../entities/HeroEntity';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface HeroCombatRadarChartProps {
  data: HeroStats;
}

const descriptions: Record<string, string[]> = {
  SKILL: ["","High skill damage"],
  "NORMAL ATTACK": ["","Improve on-hit attacks", "(i.e. double hits, crit rate, crit damage)"],
  "OPEN FIELD": ["","Performance in open field combat"],
  TANK: ["","HP / DEF / Damage reduction"],
  SURVIVABILITY: ["","Healing / Shielding / Lifesteal on-hit"],
  SUPPORT: ["","Buffs / Debuffs / Crowd control"]
};


const HeroCombatRadarChart: React.FC<HeroCombatRadarChartProps> = ({ data }) => {
  const chartData = {
    labels: ['SKILL', 'NORMAL ATTACK', 'OPEN FIELD', 'TANK', 'SURVIVABILITY', 'SUPPORT'],
    datasets: [
      {
        data: [
          data.skill,
          data.normal_attack,
          data.open_field,
          data.tank,
          data.survivability,
          data.support
        ],
        backgroundColor: "rgba(230, 175, 74, 0.5)",
        borderColor: "rgba(230, 175, 74, 0.5)",
        pointBackgroundColor: "rgb(230, 175, 74)",
        pointRadius: 3,
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
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            const label = context.label;
            const value = context.formattedValue;
            const description = descriptions[label] || '';
            return [`Score: ${value}/100`, ...description];
          }
        },
        displayColors: false,
      }
    }
  };

  return <Radar data={chartData} options={options} />;
};

export default HeroCombatRadarChart;