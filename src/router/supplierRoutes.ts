import express from 'express';
import { Request, Response, Router } from 'express';
import postSupplierRegistration, { supplierProfile } from "../controllers/suppliers/supplierRegistration"

const router:Router = express.Router();

router.get("/supplierProfile", (req: Request, res: Response) => {
  supplierProfile(req, res);
});

router.post("/supplierRegistration", async (req: Request, res: Response) => {
  postSupplierRegistration(req,res);
        })

export default router;