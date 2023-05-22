// http://localhost:8080/api/register
export const register = async (req, res) => {
    res.json("register route");
  };
  
  // http://localhost:8080/api/login
  export const login = async (req, res) => {
    res.json("login route");
  };
  
  // http://localhost:8080/api/user
  export const getUser = async (req, res) => {
    res.json("getUser route");
  };
  
  // http://localhost:8080/api/generate-otp
  export const generateOTP = async (req, res) => {
    res.json("generateOTP route");
  };
  
  // http://localhost:8080/api/verify-otp
  export const verifyOTP = async (req, res) => {
    res.json("verifyOTP route");
  };
  
  // http://localhost:8080/api/create-reset-session
  export const createResetSession = async (req, res) => {
    res.json("createResetSession route");
  };
  export const resetPassword = async (req, res) => {
    res.json("resetPassword route");
  };
  export const updateUser = async (req, res) => {
    res.json("updateUser route");
  };
  