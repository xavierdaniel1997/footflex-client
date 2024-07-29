export const validateRegisterForm = (inputLogin) => {
  const newError = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+1|1)?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!inputLogin.email) newError.email = "Email is required*";
  if (!emailRegex.test(inputLogin.email))
    newError.email = "Invalid email format";
  if (!inputLogin.password) newError.password = "Password is required*";
  if (!passwordRegex.test(inputLogin.password))
    newError.password =
      "Password must be at least 8 characters include uppercase letter, lowercase letter, one digit, and one special character";
  if (!inputLogin.phoneNumber) newError.phoneNumber = "Phone is required*";
  if (!phoneRegex.test(inputLogin.phoneNumber))
    newError.phoneNumber = "Invalid Phone no";
  if (!inputLogin.firstName) newError.firstName = "Name is required *";
  if (!inputLogin.lastName) newError.lastName = "Name is required *";
  if (inputLogin.password !== inputLogin.cPassword)
    newError.cPassword = "Invalid Password";
  return newError;
};

export const validateLoginForm = (inputLogin) => {
  const newError = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
  if (!emailRegex.test(inputLogin.email))
    newError.email = "Invalid email format";
  if (!inputLogin.email) newError.email = "Email is required*";
  if (!inputLogin.password) newError.password = "Password is required*";
  if (!passwordRegex.test(inputLogin.password))
    newError.password = "Incorrect Password";
  return newError;
};


export const validateProductForm = (inputField) => {
  const newError = {};
  if(!inputField.productName) newError.productName = "is required*";
  if(!inputField.description) newError.description = "is required*";
  if(!inputField.category) newError.category = "is required*";
  if(!inputField.brand) newError.brand = "is required*";
  if(!inputField.gender) newError.gender = "is required*";
  if(!inputField.stock) newError.stock = "is required*";
  if(!inputField.regularPrice) newError.regularPrice = "is required";
  if(!inputField.salePrice) newError.salePrice = "is required";
  
  return newError;
}







/*

if (!inputField.sizes || inputField.sizes.length === 0) {
  newError.sizes = "At least one size is required";
} else {
  const sizesErrors = [];
  inputField.sizes.forEach((sizeObj, index) => {
    if (!sizeObj.size) {
      sizesErrors[index] = sizesErrors[index] || {};
      sizesErrors[index].size = "Size is required";
    }
    if (!sizeObj.stock) {
      sizesErrors[index] = sizesErrors[index] || {};
      sizesErrors[index].stock = "Stock is required";
    } else if (isNaN(sizeObj.stock) || sizeObj.stock < 0) {
      sizesErrors[index] = sizesErrors[index] || {};
      sizesErrors[index].stock = "Stock must be a non-negative number";
    }
  });

  if (sizesErrors.length > 0) {
    newError.sizes = sizesErrors;
  }
}*/