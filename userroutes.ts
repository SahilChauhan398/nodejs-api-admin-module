import express from 'express';
const middleware = require('../middlewares/authmiddleware');
const user = require("../controllers/UserController");

const router = express.Router();


router.post('/', middleware.authMiddleware, middleware.adminMiddleware, user.createUser);


router.get('/profile', middleware.authMiddleware, user.getUserProfile);


router.put('/profile', middleware.authMiddleware, middleware.adminMiddleware, user.updateUserProfile);

router.delete('/:id', middleware.authMiddleware, middleware.adminMiddleware, user.deleteUser);


router.get('/allusers', middleware.authMiddleware, middleware.adminMiddleware, user.listUsers);

export default router;
