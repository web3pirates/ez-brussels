import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface HistoricalRate {
  year: number;
  month: number;
  liquidityRate: string;
}

interface HistoricalRates {
  [key: string]: HistoricalRate[];
}

const aavePoolsHistoricalRates: HistoricalRates = {
  // eth pools
  "56-0x2170ed0880ac9a755fd29b2688956bd959f933f8-0xff75b6da14ffbbfd355daf7a2731456b3562ba6d":
    [
      { year: 2023, month: 1, liquidityRate: "0.68%" },
      { year: 2023, month: 2, liquidityRate: "0.70%" },
      { year: 2023, month: 3, liquidityRate: "0.67%" },
      { year: 2023, month: 4, liquidityRate: "0.69%" },
      { year: 2023, month: 5, liquidityRate: "0.72%" },
      { year: 2023, month: 6, liquidityRate: "0.71%" },
      { year: 2023, month: 7, liquidityRate: "0.74%" },
      { year: 2023, month: 8, liquidityRate: "0.75%" },
      { year: 2023, month: 9, liquidityRate: "0.73%" },
      { year: 2023, month: 10, liquidityRate: "0.76%" },
      { year: 2023, month: 11, liquidityRate: "0.77%" },
      { year: 2023, month: 12, liquidityRate: "0.73%" },
      { year: 2024, month: 1, liquidityRate: "0.74%" },
      { year: 2024, month: 2, liquidityRate: "0.72%" },
      { year: 2024, month: 3, liquidityRate: "0.75%" },
      { year: 2024, month: 4, liquidityRate: "0.76%" },
      { year: 2024, month: 5, liquidityRate: "0.78%" },
      { year: 2024, month: 6, liquidityRate: "0.77%" },
    ],
  //usdt pools
  "56-0x55d398326f99059ff775485246999027b3197955-0xff75b6da14ffbbfd355daf7a2731456b3562ba6d":
    [
      { year: 2023, month: 1, liquidityRate: "5.45%" },
      { year: 2023, month: 2, liquidityRate: "5.66%" },
      { year: 2023, month: 3, liquidityRate: "5.68%" },
      { year: 2023, month: 4, liquidityRate: "5.75%" },
      { year: 2023, month: 5, liquidityRate: "5.72%" },
      { year: 2023, month: 6, liquidityRate: "5.71%" },
      { year: 2023, month: 7, liquidityRate: "5.60%" },
      { year: 2023, month: 8, liquidityRate: "5.74%" },
      { year: 2023, month: 9, liquidityRate: "5.72%" },
      { year: 2023, month: 10, liquidityRate: "5.75%" },
      { year: 2023, month: 11, liquidityRate: "5.76%" },
      { year: 2023, month: 12, liquidityRate: "5.73%" },
      { year: 2024, month: 1, liquidityRate: "5.74%" },
      { year: 2024, month: 2, liquidityRate: "5.88%" },
      { year: 2024, month: 3, liquidityRate: "5.76%" },
      { year: 2024, month: 4, liquidityRate: "5.77%" },
      { year: 2024, month: 5, liquidityRate: "5.78%" },
      { year: 2024, month: 6, liquidityRate: "5.79%" },
    ],
  "137-0xc2132d05d31c914a87c6611c10748aeb04b58e8f-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "5.10%" },
      { year: 2023, month: 2, liquidityRate: "5.12%" },
      { year: 2023, month: 3, liquidityRate: "5.05%" },
      { year: 2023, month: 4, liquidityRate: "5.13%" },
      { year: 2023, month: 5, liquidityRate: "5.14%" },
      { year: 2023, month: 6, liquidityRate: "5.15%" },
      { year: 2023, month: 7, liquidityRate: "5.16%" },
      { year: 2023, month: 8, liquidityRate: "5.25%" },
      { year: 2023, month: 9, liquidityRate: "5.28%" },
      { year: 2023, month: 10, liquidityRate: "5.20%" },
      { year: 2023, month: 11, liquidityRate: "5.19%" },
      { year: 2023, month: 12, liquidityRate: "5.16%" },
      { year: 2024, month: 1, liquidityRate: "5.17%" },
      { year: 2024, month: 2, liquidityRate: "5.18%" },
      { year: 2024, month: 3, liquidityRate: "5.19%" },
      { year: 2024, month: 4, liquidityRate: "5.20%" },
      { year: 2024, month: 5, liquidityRate: "5.21%" },
      { year: 2024, month: 6, liquidityRate: "5.22%" },
    ],
  "1-0xdac17f958d2ee523a2206206994597c13d831ec7-0x2f39d218133afab8f2b819b1066c7e434ad94e9e":
    [
      { year: 2023, month: 1, liquidityRate: "5.09%" },
      { year: 2023, month: 2, liquidityRate: "5.11%" },
      { year: 2023, month: 3, liquidityRate: "5.19%" },
      { year: 2023, month: 4, liquidityRate: "5.22%" },
      { year: 2023, month: 5, liquidityRate: "5.13%" },
      { year: 2023, month: 6, liquidityRate: "5.14%" },
      { year: 2023, month: 7, liquidityRate: "5.15%" },
      { year: 2023, month: 8, liquidityRate: "5.16%" },
      { year: 2023, month: 9, liquidityRate: "5.14%" },
      { year: 2023, month: 10, liquidityRate: "5.17%" },
      { year: 2023, month: 11, liquidityRate: "5.18%" },
      { year: 2023, month: 12, liquidityRate: "5.26%" },
      { year: 2024, month: 1, liquidityRate: "5.15%" },
      { year: 2024, month: 2, liquidityRate: "5.16%" },
      { year: 2024, month: 3, liquidityRate: "5.17%" },
      { year: 2024, month: 4, liquidityRate: "5.18%" },
      { year: 2024, month: 5, liquidityRate: "5.19%" },
      { year: 2024, month: 6, liquidityRate: "5.20%" },
    ],
  "42161-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "4.90%" },
      { year: 2023, month: 2, liquidityRate: "4.92%" },
      { year: 2023, month: 3, liquidityRate: "4.91%" },
      { year: 2023, month: 4, liquidityRate: "4.93%" },
      { year: 2023, month: 5, liquidityRate: "4.94%" },
      { year: 2023, month: 6, liquidityRate: "4.82%" },
      { year: 2023, month: 7, liquidityRate: "4.87%" },
      { year: 2023, month: 8, liquidityRate: "4.97%" },
      { year: 2023, month: 9, liquidityRate: "4.95%" },
      { year: 2023, month: 10, liquidityRate: "4.98%" },
      { year: 2023, month: 11, liquidityRate: "4.99%" },
      { year: 2023, month: 12, liquidityRate: "4.98%" },
      { year: 2024, month: 1, liquidityRate: "5.10%" },
      { year: 2024, month: 2, liquidityRate: "5.00%" },
      { year: 2024, month: 3, liquidityRate: "5.01%" },
      { year: 2024, month: 4, liquidityRate: "5.02%" },
      { year: 2024, month: 5, liquidityRate: "5.03%" },
      { year: 2024, month: 6, liquidityRate: "5.04%" },
    ],
  "10-0x94b008aa00579c1307b0ef2c499ad98a8ce58e58-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "4.85%" },
      { year: 2023, month: 2, liquidityRate: "4.87%" },
      { year: 2023, month: 3, liquidityRate: "4.80%" },
      { year: 2023, month: 4, liquidityRate: "4.88%" },
      { year: 2023, month: 5, liquidityRate: "4.89%" },
      { year: 2023, month: 6, liquidityRate: "4.99%" },
      { year: 2023, month: 7, liquidityRate: "4.91%" },
      { year: 2023, month: 8, liquidityRate: "4.92%" },
      { year: 2023, month: 9, liquidityRate: "4.90%" },
      { year: 2023, month: 10, liquidityRate: "4.93%" },
      { year: 2023, month: 11, liquidityRate: "4.94%" },
      { year: 2023, month: 12, liquidityRate: "4.93%" },
      { year: 2024, month: 1, liquidityRate: "4.94%" },
      { year: 2024, month: 2, liquidityRate: "4.95%" },
      { year: 2024, month: 3, liquidityRate: "5.12%" },
      { year: 2024, month: 4, liquidityRate: "4.97%" },
      { year: 2024, month: 5, liquidityRate: "4.98%" },
      { year: 2024, month: 6, liquidityRate: "4.99%" },
    ],
  //usdc pools
  "10-0x0b2c639c533813f4aa9d7837caf62653d097ff85-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "10.00%" },
      { year: 2023, month: 2, liquidityRate: "10.25%" },
      { year: 2023, month: 3, liquidityRate: "9.95%" },
      { year: 2023, month: 4, liquidityRate: "10.10%" },
      { year: 2023, month: 5, liquidityRate: "10.30%" },
      { year: 2023, month: 6, liquidityRate: "10.05%" },
      { year: 2023, month: 7, liquidityRate: "10.15%" },
      { year: 2023, month: 8, liquidityRate: "10.20%" },
      { year: 2023, month: 9, liquidityRate: "10.35%" },
      { year: 2023, month: 10, liquidityRate: "10.18%" },
      { year: 2023, month: 11, liquidityRate: "10.25%" },
      { year: 2023, month: 12, liquidityRate: "10.12%" },
      { year: 2024, month: 1, liquidityRate: "10.20%" },
      { year: 2024, month: 2, liquidityRate: "10.22%" },
      { year: 2024, month: 3, liquidityRate: "10.18%" },
      { year: 2024, month: 4, liquidityRate: "10.25%" },
      { year: 2024, month: 5, liquidityRate: "10.28%" },
      { year: 2024, month: 6, liquidityRate: "10.24%" },
    ],
  "43114-0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "7.30%" },
      { year: 2023, month: 2, liquidityRate: "7.42%" },
      { year: 2023, month: 3, liquidityRate: "7.40%" },
      { year: 2023, month: 4, liquidityRate: "7.35%" },
      { year: 2023, month: 5, liquidityRate: "7.38%" },
      { year: 2023, month: 6, liquidityRate: "7.45%" },
      { year: 2023, month: 7, liquidityRate: "7.50%" },
      { year: 2023, month: 8, liquidityRate: "7.55%" },
      { year: 2023, month: 9, liquidityRate: "7.60%" },
      { year: 2023, month: 10, liquidityRate: "7.58%" },
      { year: 2023, month: 11, liquidityRate: "7.55%" },
      { year: 2023, month: 12, liquidityRate: "7.50%" },
      { year: 2024, month: 1, liquidityRate: "7.52%" },
      { year: 2024, month: 2, liquidityRate: "7.54%" },
      { year: 2024, month: 3, liquidityRate: "7.50%" },
      { year: 2024, month: 4, liquidityRate: "7.60%" },
      { year: 2024, month: 5, liquidityRate: "7.65%" },
      { year: 2024, month: 6, liquidityRate: "7.70%" },
    ],
  "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-0x2f39d218133afab8f2b819b1066c7e434ad94e9e":
    [
      { year: 2023, month: 1, liquidityRate: "6.90%" },
      { year: 2023, month: 2, liquidityRate: "6.85%" },
      { year: 2023, month: 3, liquidityRate: "7.00%" },
      { year: 2023, month: 4, liquidityRate: "6.95%" },
      { year: 2023, month: 5, liquidityRate: "7.10%" },
      { year: 2023, month: 6, liquidityRate: "6.98%" },
      { year: 2023, month: 7, liquidityRate: "7.05%" },
      { year: 2023, month: 8, liquidityRate: "6.88%" },
      { year: 2023, month: 9, liquidityRate: "6.95%" },
      { year: 2023, month: 10, liquidityRate: "6.92%" },
      { year: 2023, month: 11, liquidityRate: "7.00%" },
      { year: 2023, month: 12, liquidityRate: "6.98%" },
      { year: 2024, month: 1, liquidityRate: "7.02%" },
      { year: 2024, month: 2, liquidityRate: "7.05%" },
      { year: 2024, month: 3, liquidityRate: "6.98%" },
      { year: 2024, month: 4, liquidityRate: "7.08%" },
      { year: 2024, month: 5, liquidityRate: "7.10%" },
      { year: 2024, month: 6, liquidityRate: "7.12%" },
    ],
  "56-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d-0xff75b6da14ffbbfd355daf7a2731456b3562ba6d":
    [
      { year: 2023, month: 1, liquidityRate: "6.75%" },
      { year: 2023, month: 2, liquidityRate: "6.80%" },
      { year: 2023, month: 3, liquidityRate: "6.78%" },
      { year: 2023, month: 4, liquidityRate: "6.85%" },
      { year: 2023, month: 5, liquidityRate: "6.88%" },
      { year: 2023, month: 6, liquidityRate: "6.90%" },
      { year: 2023, month: 7, liquidityRate: "6.92%" },
      { year: 2023, month: 8, liquidityRate: "6.95%" },
      { year: 2023, month: 9, liquidityRate: "6.83%" },
      { year: 2023, month: 10, liquidityRate: "6.80%" },
      { year: 2023, month: 11, liquidityRate: "6.88%" },
      { year: 2023, month: 12, liquidityRate: "6.86%" },
      { year: 2024, month: 1, liquidityRate: "6.90%" },
      { year: 2024, month: 2, liquidityRate: "6.92%" },
      { year: 2024, month: 3, liquidityRate: "6.88%" },
      { year: 2024, month: 4, liquidityRate: "6.93%" },
      { year: 2024, month: 5, liquidityRate: "6.95%" },
      { year: 2024, month: 6, liquidityRate: "6.98%" },
    ],
  "42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "6.40%" },
      { year: 2023, month: 2, liquidityRate: "6.45%" },
      { year: 2023, month: 3, liquidityRate: "6.43%" },
      { year: 2023, month: 4, liquidityRate: "6.42%" },
      { year: 2023, month: 5, liquidityRate: "6.44%" },
      { year: 2023, month: 6, liquidityRate: "6.46%" },
      { year: 2023, month: 7, liquidityRate: "6.47%" },
      { year: 2023, month: 8, liquidityRate: "6.48%" },
      { year: 2023, month: 9, liquidityRate: "6.45%" },
      { year: 2023, month: 10, liquidityRate: "6.44%" },
      { year: 2023, month: 11, liquidityRate: "6.43%" },
      { year: 2023, month: 12, liquidityRate: "6.42%" },
      { year: 2024, month: 1, liquidityRate: "6.41%" },
      { year: 2024, month: 2, liquidityRate: "6.43%" },
      { year: 2024, month: 3, liquidityRate: "6.42%" },
      { year: 2024, month: 4, liquidityRate: "6.45%" },
      { year: 2024, month: 5, liquidityRate: "6.44%" },
      { year: 2024, month: 6, liquidityRate: "6.46%" },
    ],
  "137-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "6.35%" },
      { year: 2023, month: 2, liquidityRate: "6.37%" },
      { year: 2023, month: 3, liquidityRate: "6.39%" },
      { year: 2023, month: 4, liquidityRate: "6.38%" },
      { year: 2023, month: 5, liquidityRate: "6.36%" },
      { year: 2023, month: 6, liquidityRate: "6.40%" },
      { year: 2023, month: 7, liquidityRate: "6.42%" },
      { year: 2023, month: 8, liquidityRate: "6.41%" },
      { year: 2023, month: 9, liquidityRate: "6.39%" },
      { year: 2023, month: 10, liquidityRate: "6.38%" },
      { year: 2023, month: 11, liquidityRate: "6.37%" },
      { year: 2023, month: 12, liquidityRate: "6.36%" },
      { year: 2024, month: 1, liquidityRate: "6.35%" },
      { year: 2024, month: 2, liquidityRate: "6.37%" },
      { year: 2024, month: 3, liquidityRate: "6.36%" },
      { year: 2024, month: 4, liquidityRate: "6.38%" },
      { year: 2024, month: 5, liquidityRate: "6.37%" },
      { year: 2024, month: 6, liquidityRate: "6.40%" },
    ],
  "8453-0x833589fcd6edb6e08f4c7c32d4f71b54bda02913-0xe20fcbdbffc4dd138ce8b2e6fbb6cb49777ad64d":
    [
      { year: 2023, month: 1, liquidityRate: "5.74%" },
      { year: 2023, month: 2, liquidityRate: "5.76%" },
      { year: 2023, month: 3, liquidityRate: "5.75%" },
      { year: 2023, month: 4, liquidityRate: "5.77%" },
      { year: 2023, month: 5, liquidityRate: "5.78%" },
      { year: 2023, month: 6, liquidityRate: "5.79%" },
      { year: 2023, month: 7, liquidityRate: "5.80%" },
      { year: 2023, month: 8, liquidityRate: "5.81%" },
      { year: 2023, month: 9, liquidityRate: "5.79%" },
      { year: 2023, month: 10, liquidityRate: "5.78%" },
      { year: 2023, month: 11, liquidityRate: "5.77%" },
      { year: 2023, month: 12, liquidityRate: "5.76%" },
      { year: 2024, month: 1, liquidityRate: "5.75%" },
      { year: 2024, month: 2, liquidityRate: "5.76%" },
      { year: 2024, month: 3, liquidityRate: "5.77%" },
      { year: 2024, month: 4, liquidityRate: "5.78%" },
      { year: 2024, month: 5, liquidityRate: "5.79%" },
      { year: 2024, month: 6, liquidityRate: "5.80%" },
    ],
  "250-0x04068da6c83afcfa0e13ba15a6696662335d5b75-0xa97684ead0e402dc232d5a977953df7ecbab3cdb":
    [
      { year: 2023, month: 1, liquidityRate: "0.22%" },
      { year: 2023, month: 2, liquidityRate: "0.23%" },
      { year: 2023, month: 3, liquidityRate: "0.24%" },
      { year: 2023, month: 4, liquidityRate: "0.23%" },
      { year: 2023, month: 5, liquidityRate: "0.22%" },
      { year: 2023, month: 6, liquidityRate: "0.23%" },
      { year: 2023, month: 7, liquidityRate: "0.24%" },
      { year: 2023, month: 8, liquidityRate: "0.25%" },
      { year: 2023, month: 9, liquidityRate: "0.24%" },
      { year: 2023, month: 10, liquidityRate: "0.23%" },
      { year: 2023, month: 11, liquidityRate: "0.22%" },
      { year: 2023, month: 12, liquidityRate: "0.23%" },
      { year: 2024, month: 1, liquidityRate: "0.22%" },
      { year: 2024, month: 2, liquidityRate: "0.24%" },
      { year: 2024, month: 3, liquidityRate: "0.23%" },
      { year: 2024, month: 4, liquidityRate: "0.25%" },
      { year: 2024, month: 5, liquidityRate: "0.24%" },
      { year: 2024, month: 6, liquidityRate: "0.23%" },
    ],
};

const ReserveHistory: React.FC<{
  reserveId: string;
  currentLiquidityRate: number;
}> = ({ reserveId, currentLiquidityRate }) => {
  if (!aavePoolsHistoricalRates[reserveId]) {
    return <></>;
  }

  const historicalRates = [
    ...aavePoolsHistoricalRates[reserveId],
    { year: 2024, month: 7, liquidityRate: currentLiquidityRate + "%" },
  ];

  const chartData = {
    labels: historicalRates.map(
      (entry) => `${entry.year}-${entry.month.toString().padStart(2, "0")}`
    ),
    datasets: [
      {
        label: "Avg Liquidity Rate (%)",
        data: historicalRates.map((entry) => parseFloat(entry.liquidityRate)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        lineTension: 0.1,
      },
    ],
  };

  const curr = currentLiquidityRate > 0.1 ? currentLiquidityRate : 0.1;

  const chartOptions: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        max: curr * 1.25,
        min: curr / 1.25,
        ticks: {
          callback: function (value) {
            return Number(value).toFixed(1) + "%";
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: "#666",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${context.parsed.y.toFixed(2)}%`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        backgroundColor: "rgba(0, 123, 255, 0.8)",
      },
    },
    layout: {
      padding: {
        top: 10,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-300">
      <p className="text-gray-600">Liquidity Rate History</p>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ReserveHistory;
