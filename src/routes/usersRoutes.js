import express from "express";
import UsersController from "../controllers/usersController.js";

const router = express.Router();

router.use(express.json());

router
    .get("/user", UsersController.listUsers)
    .post("/user", UsersController.addUser)
    .delete("/user", UsersController.deleteUser);

export default router;
