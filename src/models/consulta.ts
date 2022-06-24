'use strict';
import {Model} from 'sequelize';
interface ConsultaAttribute{
  id:number,
  cliente:number,
  estado:string,
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Consulta extends Model<ConsultaAttribute> implements ConsultaAttribute{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    cliente!: number;
    estado!:string;
    static associate(models:any) {
      Consulta.hasMany(models.Pregunta,{
        foreignKey:'consulta',
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      });
      Consulta.belongsTo(models.Cliente,{
        foreignKey:'cliente',
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      })
    }
  }
  Consulta.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    cliente:{
      type:DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type:DataTypes.ENUM,
      values: ['RESUELTA','EN REVISION','INCONGRUENTE'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Consulta',
  });
  return Consulta;
};