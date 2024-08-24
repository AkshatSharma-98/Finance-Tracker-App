import express from 'express';
import { createNewUser, deleteUser, getUserByID, updateUser } from '../controllers/financialRecordControllers';

const router = express.Router();

/*
    @desc Get a specific user by ID
    @route GET /getUserByID/:userID
    @access public
*/
router.get('/getUserByID/:userID', getUserByID);

/*
    @desc POST Create a new user
    @route POST /
    @access public
*/
router.post('/', createNewUser);

/*
    @desc Update details for a specific user
    @route PUT /:id
    @access public
*/
/*
    @desc Delete a specific user from DB
    @route DELETE /:id
    @access public
*/
router
    .put('/:id', updateUser)
    .delete('/:id', deleteUser);

export default router;