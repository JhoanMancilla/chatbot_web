'use strict';
import {Model} from 'sequelize';
interface PreguntaAttributes{
  id:number,
  descripcion:string,
  consulta:number,
}
module.exports = (sequelize:any, DataTypes:any) => {
  class Pregunta extends Model<PreguntaAttributes> implements PreguntaAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:number;
    descripcion!:string;
    consulta!:number;
  }
  Pregunta.init({
    id: {
      type:DataTypes.INTEGER,
      allowNull:false, 
      primaryKey:true,
      autoIncrement:true
    },
    descripcion:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    consulta:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Pregunta',
  });
  return Pregunta;
};