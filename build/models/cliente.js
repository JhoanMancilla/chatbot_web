'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cliente extends sequelize_1.Model {
        static associate(models) {
            Cliente.belongsTo(models.Persona, {
                foreignKey: 'id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
        }
    }
    Cliente.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Cliente',
    });
    return Cliente;
};
