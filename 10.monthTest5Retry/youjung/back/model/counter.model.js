module.exports = (sequelize, DataTypes) => {
    return sequelize.define("counter", {
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        } 
    }, {
        freezeTableName: false,
        timeStamp: true,
        charset: "utf8mb4",
        coolate: "utf8mb4_genral_ci"
    })
}