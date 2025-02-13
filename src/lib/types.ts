export interface RiskData {
  source_address: string;
  risk_score: string;
  risk: string;
  level_vise_risk_analysis: LevelRiskAnalysis[];
}

export interface LevelRiskAnalysis {
  level: number;
  risk_percentage: string;
  risky_entities_count: number;
  non_risky_entities_count: number;
  total_coinjoin: number;
  total_flagged: number;
  beneficiary_details: TransactionDetail[];
  payer_details: TransactionDetail[];
}

export interface TransactionDetail {
  beneficiary_address?: string;
  payer_address?: string;
  amount: number;
  date: string;
  transactions: Transaction[];
  entity_name: string;
  token_type: string;
  transaction_type: string;
}

export interface Transaction {
  tx_amount: number;
  date_time: string;
  transaction_id: string;
}
