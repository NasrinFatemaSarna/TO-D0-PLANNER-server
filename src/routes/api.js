
const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const TodoController = require('../controller/TodoController');
const AuthVerificationMiddleware = require('../middleware/AuthVerificationMiddleware');

router.post('/registration', UsersController.Registration);
router.get('/login', UsersController.Login);
router.post('/profile-update', AuthVerificationMiddleware, UsersController.profileUpdate);
router.get('/profile-details', AuthVerificationMiddleware, UsersController.profileDetails);
router.get('/recover-verify-email/:email',  UsersController.recoverVerifyEmail);
router.get('/verify-otp/:email/:otp',  UsersController.verifyOtp);



// todo start
router.post('/create-todo', AuthVerificationMiddleware, TodoController.createTodo);
router.get('/update-todo-status/:id/:status', AuthVerificationMiddleware, TodoController.updateTodoStatus);
router.get('/delete-todo/:id', AuthVerificationMiddleware, TodoController.deleteTodo);
router.get('/todo-list-by-status/:status', AuthVerificationMiddleware, TodoController.todoListByStatus);
router.get('/todo-count-by-status', AuthVerificationMiddleware, TodoController.todoCountByStatus);




// todo end
module.exports = router;





 




