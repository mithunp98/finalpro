const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateCreate = (httpRequest) => {
  const schema = Joi.object({
    tasktitle: Joi.string().required(),
    taskdescription: Joi.string().required(),
    taskstartdatetime: Joi.string().required(),
    taskenddatetime: Joi.string().required(),
    tasktypetitle: Joi.string().required(),
    prioritytype: Joi.string().required(),
    statustitle: Joi.string().required(),
    username: Joi.string().required()
    // username: Joi.string().messages({'string.pattern.base': 'Provide valid email!'}).pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    //   // .max('01-02-2023').messages({'date.format': `Date format is YYYY-MM-DD`})
    // password: Joi.string().min(7).alphanum().required(),
    // dateofbirth: Joi.string().required(),
    // country: Joi.string().required()
  });
  return schema.validate(httpRequest.body, options);
};



module.exports = {
  validateCreate
};
