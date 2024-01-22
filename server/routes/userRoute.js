import express from 'express'
import {  allUsers, changepassword, deleteUser, emailsend, loginController, registerController, singleChat } from '../controllers/userController.js';

const router  = express.Router();

router.post('/register', registerController)
router.post('/login', loginController);
router.post('/allusers', allUsers);
router.get('/single-chat/:id', singleChat);
router.delete('/deleteuser/:id', deleteUser);

router.post('/email-send', emailsend);
router.post('/change-password', changepassword);

export default router;

