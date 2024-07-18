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
