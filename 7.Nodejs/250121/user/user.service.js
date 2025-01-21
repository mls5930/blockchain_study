const userRepository = require('./user.repository')

const findOne = async({ user_id, user_pw }) => {
    const where = { user_id, user_pw };
    const user = await userRepository.findOne({where});
    return user;
}

module.exports = {
    findOne
}