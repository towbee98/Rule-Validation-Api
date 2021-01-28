const express = require("express");
const app = express();
const AppError = require("./appError");
const handlerFunction = require("./handlerFunction");
const globalErrorHandler = require("./errorController");

//Rule Validator Function
const ruleValidator = (data, rule, result, res) => {
  if (result) {
    res.status(200).json({
      message: `field ${rule.field} sucessfully validated.`,
      status: "success",
      data: {
        validation: {
          error: `${!result}`,
          field: `${rule.field}`,
          field_value: data[rule.field],
          condition: `${rule.condition}`,
          condition_value: rule.condition_value,
        },
      },
    });
  } else {
    res.status(200).json({
      message: `field ${rule.field} failed validation.`,
      status: "success",
      data: {
        validation: {
          error: `${!result}`,
          field: `${rule.field}`,
          field_value: data[rule.field],
          condition: `${rule.condition}`,
          condition_value: rule.condition_value,
        },
      },
    });
  }
};

//middleware
app.use(express.json());

//Base Root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Oladele Tobiloba Emmanuel",
      github: "@towbee98",
      email: "tobiemma200@gmail.com",
      mobile: "08124013264",
      twitter: "@oladtobi97",
    },
  });
});

//Rule Validation Route
app.post("/validate-rule", (req, res, next) => {
  console.log(req.body);
  if (typeof req.body != "object" || Array.isArray(req.body)) {
    err = handlerFunction.payloadChecker();
    return next(err);
  }
  let { rule, data } = req.body;

  //error handler for rule field
  if (!rule && typeof req.body === "object") {
    err = handlerFunction.fieldChecker("rule");
    return next(err);
  }
  //error handler for required field
  if (!data) {
    err = handlerFunction.fieldChecker("data");
    return next(err);
  }
  //error handler for rule field with unsupported data types
  if (typeof rule != "object") {
    err = handlerFunction.fieldTypeChecker("rule", "an", "object");
    return next(err);
  }

  //error handler for data field with unsupported data types
  if (!["object", "string"].includes(typeof data, 0)) {
    err = handlerFunction.fieldTypeChecker("data", "a|an", [
      "Object",
      "String",
      "Or Array",
    ]);
    return next(err);
  }

  //error handler for invalid payload
  if (
    !rule.field ||
    !["eq", "neq", "gte", "gt", "contains"].includes(
      rule.condition.toLowerCase(),
      0
    ) ||
    !rule.condition_value
  ) {
    err = handlerFunction.payloadChecker();
    return next(err);
  }
  //error handler for missing data value
  if (!data[rule.field]) {
    err = handlerFunction.requiredDataField(rule.field);
    return next(err);
  }

  if (typeof data === "string") {
    const result = handlerFunction.ruleEvaluation(data, rule);
    ruleValidator(data, rule, result, res);
  }
  if (typeof data === "object" && !Array.isArray(data)) {
    const result = handlerFunction.ruleEvaluation(data, rule);
    ruleValidator(data, rule, result, res);
  }
  if (Array.isArray(data)) {
    const result = handlerFunction.ruleEvaluation(data, rule);
    ruleValidator(data, rule, result, res);
  }
});
//This handles all the error globally
app.use(globalErrorHandler);
module.exports = app;
