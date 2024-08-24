import { Dispatch, SetStateAction } from "react";

export interface FinancialRecord {
    _id?: string;
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

export interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => Promise<void>;
    updateCurrRecord: (newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
    showUpdateModal: boolean | null;
    setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
}

export interface UserData {
    description?: string;
    amount?: number;
    category?: string;
    paymentMethod?: string;
}