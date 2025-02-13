import { useSelector } from "react-redux";
import type { RootState } from "../lib/store";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import type { TransactionDetail } from "../lib/types";

export default function TransactionDetails() {
  const { data } = useSelector((state: RootState) => state.risk);

  if (!data || !data.level_vise_risk_analysis.length) {
    return null;
  }

  const allTransactions = data.level_vise_risk_analysis.flatMap((level) => [
    ...level.beneficiary_details,
    ...level.payer_details,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Entity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTransactions.map(
                (transaction: TransactionDetail, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.transaction_type}</TableCell>
                    <TableCell>
                      {transaction.beneficiary_address ||
                        transaction.payer_address}
                    </TableCell>
                    <TableCell>
                      {transaction.amount} {transaction.token_type}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.entity_name}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
