"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {}

const TotalTicketsDashboard: React.FC<ApexChartProps> = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    const series = [44, 55, 41, 17, 15];
  
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 1400,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      
      colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], 
      labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'], 
    };
  
    return (
      <div className="w-full flex flex-col justify-center items-center">
        {isClient && (
          <Chart options={options} series={series} type="donut" width="300" height={300} />
        )}
      </div>
    );
  };

export default TotalTicketsDashboard;