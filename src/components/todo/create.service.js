const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');

const db = require('../../db/db.js');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');
const { create } = require('../../middlewares');

const CreateService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */


  doCreate: async (requestBody) => {
    const { tasktitle, taskdescription, taskstartdatetime, taskenddatetime, tasktypetitle, prioritytype, statustitle, username } = requestBody;
    let checkUsernameQuery = `select * from userdetails where username = '${username}';`;
    const checkUsernameResult = await db.promise(checkUsernameQuery);
    if (checkUsernameResult.length > 0) {
        let insertQuery = `INSERT INTO tasklist (tasktitle, taskdescription, taskstartdatetime, taskenddatetime, tasktypeid, priorityid, statusid, uid)
        SELECT '${tasktitle}', '${taskdescription}', '${taskstartdatetime}', '${taskenddatetime}', tasktypeid, priorityid, statusid, uid
        FROM tasktype, priority, statusdetails, userdetails
        WHERE tasktype.tasktypetitle = '${tasktypetitle}'
          AND priority.prioritytype = '${prioritytype}'
          AND statusdetails.statustitle = '${statustitle}'
          AND userdetails.username = '${username}' `;
        console.log(insertQuery);
        await db.promise(insertQuery);
    }
         
      let selectQuery = `select * from tasklist `;
      console.log(selectQuery)
      const selectResult = await db.promise(selectQuery);
      console.log(selectResult)

    }
  }



module.exports = CreateService;
