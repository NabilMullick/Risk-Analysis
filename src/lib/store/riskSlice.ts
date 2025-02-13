import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RiskData } from "../types";
import { RISK_DATA } from "../constants";

interface RiskState {
  data: RiskData | null;
  loading: boolean;
  error: string | null;
}

const initialState: RiskState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchRiskData = createAsyncThunk(
  "risk/fetchRiskData",
  async (address: string) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = RISK_DATA.find((item) => item.source_address === address);
    if (!data) {
      throw new Error("Address not found");
    }
    return data;
  }
);

const riskSlice = createSlice({
  name: "risk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiskData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRiskData.fulfilled,
        (state, action: PayloadAction<RiskData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRiskData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default riskSlice.reducer;
