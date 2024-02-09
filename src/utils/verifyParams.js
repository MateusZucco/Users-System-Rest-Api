exports.verifyParams = (params, requiredParams) => {
  if (!params) {
    throw "Error: parameters not found";
  }
  requiredParams.forEach((element) => {
    if (!params[element]) {
      throw `Error: parameter ${element} not found`;
    }
  });
};
