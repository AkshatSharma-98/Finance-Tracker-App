import mongoose from "mongoose";

export interface FinancialRecord {
    userID: string,
    date: Date,
    description: string,
    amount: number,
    category: string,
    paymentMethod: string,
}

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

const FinancialRecordModel = mongoose.model<FinancialRecord>(
    'Financial Record',
    financialRecordSchema
);

export default FinancialRecordModel;