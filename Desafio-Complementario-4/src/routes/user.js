import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router()
const userController = new UserController

router.get('/premium/:uemail', userController.rollSwitch)
router.get('/changePassword/:token', userController.renderChangePassword)
router.post('/changePassword', userController.changePassword)

export default router