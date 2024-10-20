import express from "express"
import { createUser , getUser, updateUser , delteUser } from "../services/crudProvider";

const router = express.Router();

router.post("/user/register",createUser)

router.get("/user/:email",getUser)

router.put("/user/:id",updateUser)

router.delete("/user/:id",delteUser)

export default router;




