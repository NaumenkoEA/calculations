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
import {Line} from 'react-chartjs-2';
import React from "react";

type Data = {
    labels: number[],
    datasets: {
        label: string,
        data: number[],
        borderColor: string,
        cubicInterpolationMode: 'monotone'
    }[]
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// eslint-disable-next-line react-refresh/only-export-components
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: 'Метод Эйлера',
        },
        y: {
            beginAtZero: false,
            ticks: {
                suggestedMax: 10
            }
        }
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 't'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'y'
            }
        }
    }

};

const labels: number[] = [];
for (let i: number = 0; i <= 1; i += 0.1) {
    labels.push(Number(i.toFixed(2))); // Округляем до двух знаков после запятой
}

// eslint-disable-next-line react-refresh/only-export-components
export const data: Data = {
    labels,
    datasets: [
        {
            label: 'Уравнение 1',
            data: [1,1.1,1.21,1.33,1.46],
            borderColor: 'rgb(54,119,166)',
            cubicInterpolationMode: 'monotone'
        },
        {
            label: 'Уравнение 2',
            data: [2,-18,162,-24],
            borderColor: 'rgb(255, 99, 132)',
            cubicInterpolationMode: 'monotone'
        }
    ],
};

const LineChart: React.FC = () => {
    return <Line options={options} data={data}   className={' flex items-start h-3/5 max-w-screen-xxl'}/>;

}

export default LineChart