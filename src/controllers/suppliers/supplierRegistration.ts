
import { Request, Response } from 'express';
import EcSuppliers from "../../models/ec_suppliers";
import { Op } from "sequelize";

const postSupplierRegistration = async(req: Request, res: Response):Promise<void> => {


try{
    const { full_name, e_mail, password, profile_pic } = req.body;
   
    const newSupplier = await EcSuppliers.create(
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

const supplierProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const { name, age } = req.query;
  // res.send(`${name} , ${age} `);

  const { full_name, e_mail, password, profile_pic } = req.body;
  console.log(
    `hi${full_name} , ${e_mail} ,${password},&${profile_pic}`
  );

  const found = await EcSuppliers.findAll({
    where: { e_mail: { [Op.in]: ["topg@gmail.com"] } },
    raw: true,
  });
  console.log(found);

  // res.send(`${full_name} , ${e_mail} ,${password},&${profile_pic}`);
  res.send(found);
  //   return found;
};

export default postSupplierRegistration ;
export { supplierProfile };