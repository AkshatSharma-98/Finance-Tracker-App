import React, { useState, useContext, createContext, useEffect } from 'react';
import { FinancialRecord, FinancialRecordsContextType } from '../lib/types';
import { useUser } from '@clerk/clerk-react';

// created the context:
export const FinancialRecordsContext = createContext<
    FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const { user } = useUser();
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

    const fetchRecords = async () => {
        if (!user) return;

        const response = await fetch(`/financial-records/getUserByID/${user?.id ?? ""}`);
        if (response.ok) {
            const records = await response.json();
            setRecords(records);
        }
    }

    useEffect(() => {
        fetchRecords();
    }, []);

    const addRecord = async (record: FinancialRecord): Promise<void> => {
        const response = await fetch("/financial-records", {
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            if (response.ok) {
                const newRecord: FinancialRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        }
        catch (err) { console.log(err); }
    }

    const updateCurrRecord = async (newRecord: FinancialRecord) => {
        const userAttrs = {
            description: newRecord.description,
            amount: newRecord.amount,
            category: newRecord.category,
            paymentMethod: newRecord.paymentMethod
        }

        const response = await fetch(`/financial-records/${newRecord._id}`, {
            method: 'PUT',
            body: JSON.stringify(userAttrs),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            if (response.ok) {
                await response.json();
                const updatedObj = {
                    ...userAttrs,
                    _id: newRecord._id ?? '',
                    userID: newRecord.userID
                }

                const newObj = records.map(record => {
                    if (record._id === newRecord._id) {
                        record = {
                            ...userAttrs,
                            userID: newRecord.userID,
                            _id: newRecord._id,
                            date: newRecord.date
                        }
                    }
                    return record;
                });
                setRecords(newObj);
            }
        }
        catch (err) { console.log(err); }

    }

    const deleteRecord = async (id: string | undefined) => {
        const response = await fetch(`/financial-records/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            if (response.ok) {
                await response.json();
                setRecords(records.filter(record => record._id !== id));

            }
        }
        catch (err) { console.log(err); }
    }

    return (
        <FinancialRecordsContext.Provider
            value={{
                records,
                addRecord,
                deleteRecord,
                updateCurrRecord,
                showUpdateModal,
                setShowUpdateModal
            }}>
            {children}
        </FinancialRecordsContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext);
    if (!context) {
        throw new Error('Forbidden!');
    }
    return context;
}