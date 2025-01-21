const { User } = require('../model');

const findOne = async ({ where }) => {
    try {
      const { user_id, user_pw } = where;
      const result = await User.findOne(
        {
            where: {
                user_id: user_id,
                user_pw: user_pw
            }
        }
      )
      const { dataValues } = result;
      return dataValues;
    } catch (e) {
      throw new Error(e);
    }
};
  
module.exports = {
    findOne,
};