module.exports = (sequelize , DataTypes) => {
    return sequelize.define("countertest",{
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {  
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW  
        }
    },{
        freezeTableName: false,
        timestamps: true,
        charset:"utf8mb4",
        collate:"utf8mb4_general_ci"
    })
}