import express from 'express';
import { Request, Response, Router } from 'express';
import { customerProfile } from "../controllers/customers/customerRegistration"
import postCustomerRegistration from "../controllers/customers/customerRegistration";
import { verifyToken } from '../middlewares/verifyjwt';
import resetPassword from '../controllers/authenication/resetPassword';


const router:Router = express.Router();
router.get("/customerRegistration", async(req: Request, res: Response) => {
  customerProfile(req,res);
});


router.post("/customerRegistration", async (req: Request, res: Response) => {
  postCustomerRegistration(req,res);
});

router.patch("/",verifyToken,  (req: Request, res: Response) => {
      resetPassword(req, res);
});

export default router;
