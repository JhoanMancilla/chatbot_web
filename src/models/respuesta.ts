'use strict';
import {Model} from 'sequelize';
interface RespuestaAttributes{
  id:number,
  description:string,
  pregunta:number
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Respuesta extends Model<RespuestaAttributes> implements RespuestaAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    description!:string;
    pregunta!:number
    static associate(models:any) {
      Respuesta.belongsTo(models.Pregunta,{
        foreignKey:'pregunta',
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      })
    }
  }
    
  Respuesta.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    pregunta:{
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Respuesta',
  });
  return Respuesta;
};