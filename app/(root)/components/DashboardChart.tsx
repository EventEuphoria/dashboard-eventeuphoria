"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {}

const DashboardChart: React.FC<ApexChartProps> = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      foreColor: '#888888',
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  };

  return (
    <div className="">
      {isClient && (
        <Chart options={options} series={series} type="line" width={650} height={350} />
      )}
    </div>
  );
};

export default DashboardChart;