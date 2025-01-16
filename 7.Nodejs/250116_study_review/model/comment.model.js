// 2. 테이블 구조 정의
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
        // 복수형 할게!
        freezeTableName: false,
    })
}

module.exports = CommentModel
