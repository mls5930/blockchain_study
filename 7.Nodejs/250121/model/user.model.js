module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userid: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        userpw: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }, {
        freezeTableName: false
    })
}