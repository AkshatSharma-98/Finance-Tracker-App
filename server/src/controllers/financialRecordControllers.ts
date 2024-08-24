import { Request, Response } from "express";
import FinancialRecordModel from '../models/financialRecordModel';

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params;

        const records = await FinancialRecordModel.find({ userID });
        if (records.length === 0) {
            return res.status(404).json({ message: 'No records Found!' });
        } else {
            return res.status(200).json(records);
        }
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
};

export const createNewUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        if (Object.entries(req.body).length < 6) {
            res.status(404).json({ message: 'Enter all the missing fields!' });
        } else {
            const newRecord = new FinancialRecordModel(req.body);
            const savedRecord = await newRecord.save();
            res.status(200).send(savedRecord);
        }

    }
    catch (error) {
        res.status(500).json({ error: error });

    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedData = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
            req.params.id,
            updatedData
        );
        if (!record) {
            res.status(404).json({ message: 'User not found!' });
        } else {
            res.status(200).json(record);
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const record = await FinancialRecordModel.findByIdAndDelete(req.params.id);
        if (!record) {
            res.status(404).json({ message: 'Delete operation failed!' })
        } else {
            res.status(200).json({ message: `user with id: ${req.params.id} deleted successfully!` })
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}