import React, { useState } from 'react';
import { useFinancialRecords } from '../../contexts/FinancialRecordContext';
import './Modal.scss';
import { FinancialRecord } from '../../lib/types';
import iconClose from '../../assets/icon-close.svg';

const Modal = (
    { updateRecord }:
        { updateRecord: FinancialRecord }
) => {
    const { setShowUpdateModal, updateCurrRecord } = useFinancialRecords();
    const [data, setData] = useState<FinancialRecord>({ ...updateRecord });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(prevData => {
            return {
                ...prevData,
                [e.target.id]: e.target.value
            }
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateCurrRecord(data);
        setShowUpdateModal(prev => !prev);
    }

    return (
        <>
            <div className="modal-bg" onClick={() => setShowUpdateModal(prev => !prev)}></div>
            <form className='modal-container' onSubmit={handleSubmit}>
                <h3>Edit Options for Current Entry!</h3>
                <div className="form-field">
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        className='input'
                        value={data.description}
                        id='description'
                        placeholder='Enter Expense'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-field">
                    <label>Amount(₹):</label>
                    <input type="number"
                        required
                        className='input'
                        value={data.amount}
                        id='amount'
                        placeholder='Enter Amount'
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select
                        required
                        className='input'
                        id='category'
                        value={data.category}
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
                        value={data.paymentMethod}
                        onChange={e => handleChange(e)}
                    >
                        <option value="">Select a Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <button type="submit" className="button">UPDATE RECORD</button>
                <button className='close-btn' onClick={() => setShowUpdateModal(prev => !prev)}>
                    <img src={iconClose} alt="close" />
                </button>
            </form>
        </>
    );
}

export default Modal