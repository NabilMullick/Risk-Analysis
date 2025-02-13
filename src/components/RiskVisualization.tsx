import { useSelector } from "react-redux";
import type { RootState } from "../lib/store";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RiskVisualization() {
  const { data } = useSelector((state: RootState) => state.risk);

  if (!data) {
    return null;
  }

  const riskPercentage = Number.parseInt(data.risk_score);
  const safePercentage = 100 - riskPercentage;

  const chartData = {
    labels: ["Risk", "Safe"],
    datasets: [
      {
        data: [riskPercentage, safePercentage],
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed + "%";
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}>
      <Card>
        <CardHeader>
          <CardTitle>Risk Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 md:h-96">
            <Pie data={chartData} options={options} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
