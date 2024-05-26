'use client'
import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type ChartData = {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
};

type ChartState = {
    labels?: string[];
    datasets: ChartData[];
};

const BarChart = () => {
    const [chartData, setChartData] = useState<ChartState>({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData({
            labels: ['월', '화', '수', '목', '금'],
            datasets: [
                {
                    label: "Test Data",
                    data: [19215,12315,63432,12356,96341],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgb(53, 162, 235, .4)'
                },
            ]
        })

        setChartOptions({
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: '[Test Data] 기획중'
                }
            },
            maintainAspectRatio: false,
            responsive: true
        })
    }, [])

    return (
        <>
            <div
                className='
                    w-full
                    h-[50vh]
                    m-auto
                    p-4
                    relative
                    border
                    rounded-lg
                    bg-white
                    md:col-span-2
                    lg:h-[70vh]
                '
            >
                <Bar
                    data={chartData}
                    options={chartOptions}
                />
            </div>
        </>
    );
};

export default BarChart;