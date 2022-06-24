'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Respuesta extends sequelize_1.Model {
        static associate(models) {
            Respuesta.belongsTo(models.Pregunta, {
                foreignKey: 'pregunta',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }
    Respuesta.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        pregunta: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Respuesta',
    });
    return Respuesta;
};
