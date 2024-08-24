import React, { useState } from 'react'
import { useFinancialRecords } from '../../contexts/FinancialRecordContext'
import editImg from '../../assets/icon-edit.svg';
import deleteImg from '../../assets/icon-delete.svg';
import './styles/financialRecordList.scss';
import Modal from '../UpdateModal/Modal';
import { FinancialRecord } from '../../lib/types';

const FinancialRecordList: React.FC = () => {

  const TOTAL_EXPENSE: number = 0;
  const { records, deleteRecord, showUpdateModal, setShowUpdateModal } = useFinancialRecords();
  const [updateRecord, setUpdateRecord] = useState<FinancialRecord>({
    userID: "",
    date: new Date(),
    description: "",
    amount: 0,
    category: '',
    paymentMethod: '',
  });

  const handleEditFn = (record: FinancialRecord) => {
    setShowUpdateModal(prev => !prev);
    setUpdateRecord(record);
  }

  return (
    <>
      <table className='records-container'>
        <thead>
          <tr className="records-header">
            <th>DESCRIPTION</th>
            <th>AMOUNT(₹)</th>
            <th>CATEGORY</th>
            <th>PAYMENT METHOD</th>
            <th>DATE CREATED</th>
            <th>EDIT/DELETE</th>
          </tr>
        </thead>
        {
          records && records.map((record, index) => {
            let date = new Date(record.date);
            let flag = index === records.length - 1;

            return (
              <tbody key={Math.random()}>
                <tr className="record-item" key={Math.random()}>
                  <td className={`${flag ? 'desc-last-child' : ''}`}>
                    <span>{index + 1}. </span>
                    <span>{record.description}</span>
                  </td>
                  <td>{record.amount}</td>
                  <td>{record.category}</td>
                  <td>{record.paymentMethod}</td>
                  <td>
                    <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                    <br />
                    <span>
                      {date.getHours() - 12}:{date.getMinutes()} {date.getHours() >= 12 ? 'PM' : 'AM'}
                    </span>
                  </td>
                  <td className={`${flag ? 'td-last-child' : ''}`}>
                    <button className='edit'
                      onClick={() => handleEditFn(record)}
                    ><img src={editImg} alt="edit" /></button>
                    <button className='delete'
                      onClick={() => deleteRecord(record._id ?? "")}
                    ><img src={deleteImg} alt="delete" /></button>
                  </td>
                </tr>
              </tbody>
            )
          })
        }
      </table >
      {
        showUpdateModal ?
          <Modal updateRecord={updateRecord} /> :
          ""
      }
    </>
  )
}

export default FinancialRecordList