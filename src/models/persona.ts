'use strict';
import {Model} from 'sequelize';
interface PersonaAttributes {
  id:number,
  nombre:string,
  apellido:string,
  correo:string,
  tipo:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Persona extends Model<PersonaAttributes> implements PersonaAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    nombre!:string;
    apellido!:string;
    correo!:string;
    tipo!:string;
    static associate() {
      //Associations
    }
  }
  Persona.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tipo:{
      type: DataTypes.ENUM,
      values: ['ADMINISTRADOR','CLIENTE'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};
