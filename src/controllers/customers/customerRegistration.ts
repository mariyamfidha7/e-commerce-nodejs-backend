import { Request, Response } from 'express';
import EcCustomers from "../../models/ec_customers";

const customerProfile = async (req: Request, res: Response): Promise<void> => {
  const { full_name, e_mail, password } = req.body;
  console.log(`hi ${full_name} , ${e_mail} ,${password}`);

  const found = await EcCustomers.findAll({
    where: { e_mail },
    raw: true,
  });
  console.log(found);

  res.send(found);
  //   return found;
};

const postCustomerRegistration = async(req: Request, res: Response):Promise<void> => {

try{
    const { full_name, e_mail, password, profile_pic } = req.body;
   
    const newSupplier = await EcCustomers.create(
          {
            full_name,
            e_mail,
            password,
            profile_pic:Buffer.from(profile_pic),
          },{raw:true} //to get rid of metadata
        );
      
          res.status(201).json({registration_id:newSupplier.registration_id});
        }catch(error:any){
          console.log(error);
          res.status(500).json({ error:error.toString() });
        }

    }

export default  postCustomerRegistration ;
export { customerProfile };