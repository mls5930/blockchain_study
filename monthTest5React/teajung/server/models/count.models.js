const { Model, DataTypes } = require("sequelize");

class Count extends Model{
    static initalize(sequelize){
        Count.init({
            id : {
                type : DataTypes.INTEGER,
                allowNull : false,
                primaryKey : true,
                autoIncrement : true,
            },

            count : {
                type : DataTypes.INTEGER,
                allowNull : false
            }
        },{
            sequelize,
            tableName : "Counts",
            modelName : "Count",
            timestamps : true
        });
        return sequelize;
    }
}

module.exports = {Count};