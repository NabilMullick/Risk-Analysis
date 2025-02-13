import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../lib/store";
import { fetchRiskData } from "../lib/store/riskSlice";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: () => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      await dispatch(fetchRiskData(address));
      onSearch();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSearch}
      className="mb-8 flex gap-2">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Enter blockchain address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="pl-10 pr-4 py-5 w-full"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <Button type="submit" size={"lg"} className="bg-primary hover:bg-primary/90">
        Analyze
      </Button>
    </motion.form>
  );
}
