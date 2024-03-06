import config from "../config/config";
import services from "../services/services";

const signUp = async (payload) => {
  const apiEndPoint = config.baseUrl_sandeep + config.apiName.signUp;
  // debugger
  try {
    const response = await services.signUpSignInPost(apiEndPoint, payload);
    if (response) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const signIn = async (payload) => {
  const apiEndPoint = config.baseUrl_sandeep + config.apiName.signIn;
  // debugger
  try {
    const response = await services.signUpSignInPost(apiEndPoint, payload);
    if (response) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const signUpSignInAction = { signUp, signIn };

export default signUpSignInAction;
