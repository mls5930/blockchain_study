// 시퀄라이즈 => 모델을 불러올거임. User
const { User } = require('../model');

const findOne = async({where}) => {
    const {user_id, user_pw} = where;
    const result = await User.findOne({
        where : {
            userid: user_id,
            userpw: user_pw
        }
    })
    const { dataValues } = result;
    return dataValues 
}

module.exports = {
    findOne
}