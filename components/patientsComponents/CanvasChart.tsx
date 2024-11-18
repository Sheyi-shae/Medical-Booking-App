'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


export default function CanvasChart() {
    const data = {
        labels: ['Scheduled', 'Cancelled', 'Pending', 'Completed'],
        datasets: [
            {
                label: 'Customer Satisfaction',
                data: [5, 31, 40, 17, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
                
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true,
        },
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Customer Satisfaction',
            },
        },
    };

    return <Doughnut data={data} options={options}  />;
}
