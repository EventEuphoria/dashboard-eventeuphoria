"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApexChartProps {}

const TotalRevenueDashboard: React.FC<ApexChartProps> = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const series = [42, 47, 52, 58, 65];

  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 380,
      type: 'polarArea'
    },
    labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
    fill: {
      opacity: 1
    },
    stroke: {
      width: 1,
      colors: undefined
    },
    yaxis: {
      show: false
    },
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        },
        spokes: {
          strokeWidth: 0
        },
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.6
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full ">
      {isClient && (
        <Chart options={options} series={series} type="polarArea" width={300} height={300} />
      )}
    </div>
  );
};

export default TotalRevenueDashboard;