import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react';
import { useFinancialRecords } from '../../contexts/FinancialRecordContext';
import { FinancialRecord, UserData } from '../../lib/types';
import './styles/financialRecordForm.scss';

export const FinancialRecordForm: React.FC = () => {
    const { addRecord } = useFinancialRecords();
    const { user } = useUser();
    const [userData, setUserData] = useState<UserData>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const newRecord: FinancialRecord = {
            userID: user?.id ?? "",
            date: new Date(),
            description: userData.description ?? '',
            amount: userData.amount ?? 0,
            category: userData.category ?? '',
            paymentMethod: userData.paymentMethod ?? '',
        }

        addRecord(newRecord);
        setUserData({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { id, value } = e.target;

        setUserData(prevData => {
            return {
                ...prevData,
                [id]: value
            }
        });
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        className='input'
                        id='description'
                        placeholder='Enter Expense'
                        value={userData.description ?? ''}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-field">
                    <label>Amount(₹):</label>
                    <input type="number"
                        required
                        className='input'
                        id='amount'
                        placeholder='Enter Amount'
                        value={userData.amount ?? ''}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select
                        required
                        className='input'
                        id='category'
                        value={userData.category ?? ''}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Select An Option:</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Payment Method:</label>
                    <select
                        required
                        className='input'
                        id='paymentMethod'
                        value={userData.paymentMethod ?? ''}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Select a Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <button type="submit" className="button">ADD RECORD</button>
            </form>
        </div>
    )
}
