'use strict';
import {Model} from 'sequelize';

interface ClienteAttribute{
  id:number,
  codigo:string
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Cliente extends Model <ClienteAttribute>  implements ClienteAttribute {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
      id!: number;
      codigo!:string;
    static associate(models:any) {
      Cliente.belongsTo(models.Persona,{
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  Cliente.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      autoIncrement:false,
      primaryKey:true
    },
    codigo: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};