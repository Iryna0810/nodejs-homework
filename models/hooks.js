export const handleSaveError = (error, data, next) => {
    const { code, name } = error;
    console.log(code);
    console.log(name);
    console.log('Hello')
    error.status = (code === 11000 && name === "MongoServerError") ? 409 : 400;
    next();
};

export const validateAtUpdate = function (next) {
    this.options.runValidators = true;
    next();
};

