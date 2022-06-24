'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Administrador extends sequelize_1.Model {
        static associate(models) {
            Administrador.belongsTo(models.Persona, {
                foreignKey: 'id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
        }
    }
    Administrador.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true
        },
        clave: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^[0-9a-f]{64}$/i
            }
        },
        adminSecundario: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Administrador',
    });
    return Administrador;
};
