const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const JwtService = require('./jwt.service');
const db = require('../../db/db.js');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');
const { auth } = require('../../middlewares');

const AuthService = {
  
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  doLogin: async (requestBody) => {
    const { username, password } = requestBody;
    let queryObj = `select * from userdetails where username = '${username}';`;
    const resultObj = await db.promise(queryObj);
    if (resultObj.length==0) {
      throw new BadRequestError('Username or Password is invalid!');
    } else {
      var logusername = resultObj[0].username;
      var logpassword = resultObj[0].password;
      console.log(bcrypt.compareSync(password,logpassword))
      if (username == logusername && bcrypt.compareSync(password,logpassword)) {
        payload = {
          userId: resultObj[0].uid,
          role: 'user',
          username: resultObj[0].username
        };
        // localStorage.setItem("token", accessToken)
        // const uid = `select uid from userdetails where username = '${username}';`;
        // localStorage.setItem("userid", uid)
        const accessToken = await JwtService.generateJWT({
          payload
        });
        return {
          accessToken,
          ...payload
        };
    }
  }
},




  doRegister: async (requestBody) => {
    const { firstname, lastname, username, password, dateofbirth, country } = requestBody;
    let checkUsernameQuery = `select * from userdetails where username = '${username}';`;
    const checkUsernameResult = await db.promise(checkUsernameQuery);
    if (checkUsernameResult.length > 0) {
    throw new BadRequestError('Username already exists!');
    } else {
      const saltRound = 10;
      const hashed_pass = await bcrypt.hash(password, saltRound);
      console.log(hashed_pass)
      let insertQuery = `insert into userdetails (firstname, lastname, username, password, dateofbirth, country) values ('${firstname}', '${lastname}', '${username}', '${hashed_pass}', '${dateofbirth}', '${country}');`;
      console.log(insertQuery)
      await db.promise(insertQuery);

      let selectQuery = `select * from userdetails where username = '${username}';`;
      console.log(selectQuery)
      const selectResult = await db.promise(selectQuery);
      console.log(selectResult)

      payload = {
        userId: selectResult[0].uid,
        role: 'user',
        username: selectResult[0].username
      };
    }
      
    }
  }



module.exports = AuthService;
