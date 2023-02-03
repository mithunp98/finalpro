const { auth } = require('../../middlewares');
const AuthService = require('./auth.service');

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    console.log('AA')
    const loginData = await AuthService.doLogin(httpRequest.body);

    return {
      statusCode: 200,
      body: {
        data: loginData
      }
    };
  },
  
  register: async (httpRequest) => {
    console.log('AA')
    const registerData = await AuthService.doRegister(httpRequest.body);

    return {
      statusCode: 200,
      body: {
        data: registerData
      }
    };
  }



};







module.exports = AuthController;
