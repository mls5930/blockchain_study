const CommentModel = (sequelize, DataTypes) => {
    return sequelize.define("comment", {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        freezeTableName: false,
    })
}

module.exports = CommentModel
