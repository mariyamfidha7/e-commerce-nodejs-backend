import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import EcSuppliers from '../../models/ec_suppliers.ts';

const login = async(req: Request, res: Response):Promise<void> => {
    const { e_mail, password, client_type } = req.body;

try {
    let user;
    if (client_type === "supplier") {
        user = await EcSuppliers.findOne({ where: { e_mail }, raw: true });
    }
    else if (client_type === "customer") {
        user = await EcSuppliers.findOne({ where: { e_mail }, raw: true });
    }
    if (user?.password === password) {
        const token = jwt.sign(
            { registrationId: user?.registration_id, client_type },
            'your-secret-key', // Replace with your secret key
            { expiresIn: '24h' } // Token expiration time
        );
        res.status(200).json({ token });
    }
    else {
        res.status(401).json({ message: "Invalid credentials" })
    }
}catch(error:any){
      console.log(error);
      res.status(500).json({ error:error.toString() });
    }

}

export default login;