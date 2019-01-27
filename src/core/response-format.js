module.exports = {
  wrap: (error, code, status, message, data) => {
    let sequelizeError = undefined;
    if (error && error.original) {
      sequelizeError = {
        errno: error.original.errno,
        code: error.original.code,
        message: error.original.message
      };
    }

    if (sequelizeError) {
      return {
        isSequelizeError: true,
        error: sequelizeError,
        code: code ? code : null,
        status: status ? status : null,
        message: sequelizeError.message,
        data: data ? data : null
      };
    } else {
      return {
        isSequelizeError: false,
        error: error ? { message: error.message } : null,
        code: code ? code : null,
        status: status ? status : null,
        message: error ? error.message : message,
        data: data ? data : null
      };
    }
  }
};
