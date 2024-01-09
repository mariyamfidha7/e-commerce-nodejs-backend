import express from "express";
import { Request, Response } from "express";
import { customerProfile } from "../controllers/customers/customerRegistration";
import login from "../controllers/authenication/login";

const router = express.Router();
router.get("/viewProfile", (req: Request, res: Response) => {
  customerProfile(req, res);
});

router.post("/postData", (req: Request, res: Response) => {
  login(req, res);
});

export default router;
