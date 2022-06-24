'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Persona extends sequelize_1.Model {
        static associate() {
            //Associations
        }
    }
    Persona.init({
        id: {
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
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tipo: {
            type: DataTypes.ENUM,
            values: ['ADMINISTRADOR', 'CLIENTE'],
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Persona',
    });
    return Persona;
};
