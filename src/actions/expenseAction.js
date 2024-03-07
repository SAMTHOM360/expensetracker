// import { Services } from "../services/services";
// import { services } from "../services/services";
import services from "../services/services";
import config from "../config/config";

const sessionData = JSON.parse(sessionStorage.getItem("loginData"));
const userID = sessionData?.id;
const getAllCategories = async () => {
  const apiEndPoint = config.baseUrl + config.apiName.categories;

  try {
    const res = await services.get(apiEndPoint);
    if (res) {
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};
const getAllFriends = async () => {
  const apiEndPoint = config.baseUrl + config.apiName.friends;

  // const userID = 1;
  try {
    // const res = await services.get(apiEndPoint, { userID });
    const res = await services.get(apiEndPoint + `?userID=${userID}`);

    if (res) {
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

const addExpense = async (payload) => {
  console.log("it is coming here");
  const apiEndPoint = config.baseUrl + config.apiName.saveExpense;

  console.log("add expense endpoint", apiEndPoint);
  try {
    const res = await services.post(apiEndPoint, payload);
    // console.log("inside try block");

    if (res) {
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

const getTableData = async (payload) => {
  // const userID = 1;

  const apiEndPoint = config.baseUrl + config.apiName.getTableData;
  try {
    // const res = await services.get(apiEndPoint, { userID });
    const res = await services.get(apiEndPoint + `?userID=${userID}`);

    if (res) {
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

const expenseAction = {
  getAllCategories,
  getAllFriends,
  addExpense,
  getTableData,
};

export default expenseAction;
