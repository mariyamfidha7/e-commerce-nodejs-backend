import { Sequelize,DataTypes } from 'sequelize';
import sequelize  from "../config/sequelize-config";
import EcCustomers from '../../types/modelTypes/ec_customers';  
import bcrypt from 'bcrypt';

EcCustomers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  e_mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_pic: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  registration_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:():string=>{
        return Math.floor(10000 + Math.random()*90000).toString();
    }
  },
  registration_time_stamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'), //sequelize doesnt support current timestamp so we send it directly using literal
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
  },
},
{
    sequelize,
    modelName:'ec_customers',
    tableName:'ec_customers',
    hooks:{
        beforeCreate:(user:EcCustomers)=>{
            //Hash the password using bcrypt before creating the record
            const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            user.password = hashedPassword;
        }
    }
});

export default EcCustomers;
