const AppError = require("./appError");

//this returns an error for a required field that was not included
exports.fieldChecker = (field) => {
  return new AppError(`${field} is required .`, 400);
};

//this returns the error if  data type of a field is  not allowed
exports.fieldTypeChecker = (field, article, ...type) => {
  return new AppError(`${field} should be ${article} ${type}.`, 400);
};

//returns the error if the payload is not valid
exports.payloadChecker = () => {
  return new AppError(`Invalid JSON payload passed.`, 400);
};
//returns this error if a particular field value is missing
exports.requiredDataField = (value) => {
  return new AppError(`field ${value} is missing from data.`, 400);
};

exports.ruleEvaluation = (data, rule) => {
  if (typeof data === "string") {
    data = data.split("");
  }
  if (rule.condition.toLowerCase() === "eq") {
    return data[rule.field] === rule.condition_value;
  } else if (rule.condition.toLowerCase() === "gte") {
    return data[rule.field] >= rule.condition_value;
  } else if (rule.condition.toLowerCase() === "neq") {
    return data[rule.field] != rule.condition_value;
  } else if (rule.condition.toLowerCase() === "contains") {
    return data[rule.field] === rule.condition_value;
  }
};
// //this validates the data if it is a string
// exports.validateStringData = (data, rule) => {
//   data = data.split("");
//   if (rule.condition.toLowerCase() === "eq") {
//     return data[rule.field] === rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "gte") {
//     return data[rule.field] >= rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "neq") {
//     return data[rule.field] != rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "contains") {
//     return data[rule.field] === rule.condition_value;
//   }
// };
// //this validates the data if it is an object
// exports.validateObjectData = (data, rule) => {
//   if (rule.condition.toLowerCase() === "eq") {
//     return data[rule.field] === rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "gte") {
//     return data[rule.field] >= rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "neq") {
//     return data[rule.field] != rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "contains") {
//     return data[rule.field] === rule.condition_value;
//   }
// };
// //this validates the data if it is an array
// exports.validateArrayData = (data, rule) => {
//   if (rule.condition.toLowerCase() === "eq") {
//     return data[rule.field] === rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "gte") {
//     return data[rule.field] >= rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "neq") {
//     return data[rule.field] != rule.condition_value;
//   } else if (rule.condition.toLowerCase() === "contains") {
//     return data[rule.field] === rule.condition_value;
//   }
// };
