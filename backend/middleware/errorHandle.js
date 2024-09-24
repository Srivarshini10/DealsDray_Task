exports.errorHandler = (err, req, res, next) => {
  //1.Validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    return res.status(400).json({
      message: "You are entered wrong data",
      errors,
    });
  }

  //2.CastError
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "You are entered wrong Id",
      error: `Invalid ${err.path}:${err.value}`,
    });
  }

  //3.Duplicate error
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern)[0];
    const duplicateValue = err.keyValue[duplicateField];
    return res.status(400).json({
      message: `You are entered ${duplicateValue} that is already exist in  ${duplicateField}`,
    });
  }

  res.status(500).json({
    message: "Fail",
    error: err.message || "Internal Error",
  });
};
