import { useSelector } from "react-redux";
import type { RootState } from "../lib/store";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function RiskDisplay() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.risk
  );

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-red-500 text-center">
        Error: {error}
      </motion.div>
    );
  }

  if (!data) {
    return null;
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low risk":
        return "text-risk-low";
      case "medium risk":
        return "text-risk-medium";
      case "high risk":
      case "highly risky":
        return "text-risk-high";
      default:
        return "text-gray-500";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low risk":
        return <CheckCircle className="inline-block mr-2" size={24} />;
      case "medium risk":
        return <AlertTriangle className="inline-block mr-2" size={24} />;
      case "high risk":
      case "highly risky":
        return <XCircle className="inline-block mr-2" size={24} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Risk Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Address</p>
              <p className="text-lg font-semibold break-all">
                {data.source_address}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Risk Score
              </p>
              <p className="text-4xl font-bold">{data.risk_score}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Risk Level
              </p>
              <p className={`text-2xl font-bold ${getRiskColor(data.risk)}`}>
                {getRiskIcon(data.risk)}
                {data.risk}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
