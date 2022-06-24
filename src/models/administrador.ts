'use strict';
import {Model} from 'sequelize';

interface AdministradorAttributes{
  id:number,
  clave:string,
  adminSecundario:number
}


module.exports = (sequelize:any, DataTypes:any) => {
  class Administrador extends Model<AdministradorAttributes> implements AdministradorAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    clave!:string;
    adminSecundario!:number;
    static associate(models:any) {
      Administrador.belongsTo(models.Persona,{
        foreignKey:'id',
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      })
    }
  }
  Administrador.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:false,
      primaryKey:true
    },
    clave: {
      type: DataTypes.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i
      }
    },
    adminSecundario:{
      type: DataTypes.BIGINT,
      defaultValue:0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Administrador',
  });
  return Administrador;
};