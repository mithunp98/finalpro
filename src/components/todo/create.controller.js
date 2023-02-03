const { auth } = require('../../middlewares');
const CreateService = require('./create.service');

const CreateController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  create: async (httpRequest) => {
    console.log('AA')
    const createData = await CreateService.doCreate(httpRequest.body);

    return {
      statusCode: 200,
      body: {
        data: createData
      }
    };
  },
  



};







module.exports = CreateController;
