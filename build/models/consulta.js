'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Consulta extends sequelize_1.Model {
        static associate(models) {
            Consulta.hasMany(models.Pregunta, {
                foreignKey: 'consulta',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
            Consulta.belongsTo(models.Cliente, {
                foreignKey: 'cliente',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
        }
    }
    Consulta.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        cliente: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM,
            values: ['RESUELTA', 'EN REVISION', 'INCONGRUENTE'],
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Consulta',
    });
    return Consulta;
};
