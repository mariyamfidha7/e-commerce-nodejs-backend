import { Model } from 'sequelize'; //model comes in mvc architecture. model in sequelize basically defines the structure of the 

class EcSuppliers extends Model{
    public id?: number;
    public full_name!: string;
    public e_mail!: string;
    public password!: string;
    public profile_pic!: Buffer | null;  //buffer because not sure what type, base64 or blob type or whatever
    public registration_id?: string;
    public registration_time_stamp?: Date;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default EcSuppliers;