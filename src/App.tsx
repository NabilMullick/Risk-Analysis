import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import SearchBar from "./components/SearchBar";
import RiskDisplay from "./components/RiskDisplay";
import RiskVisualization from "./components/RiskVisualization";
import { AnimatePresence, motion } from "framer-motion";
import TransactionDetails from "./components/TransactionDetails";

export default function RiskAnalysisPage() {
  const [searchPerformed, setSearchPerformed] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Blockchain Risk Analysis Dashboard
          </h1>
          <SearchBar onSearch={() => setSearchPerformed(true)} />
          <AnimatePresence>
            {searchPerformed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8">
                <RiskDisplay />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <RiskVisualization />
                  <TransactionDetails />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Provider>
  );
}
