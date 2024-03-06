// import { Services } from "../services/services";
// import { services } from "../services/services";
import services from "../services/services";
import config from "../config/config";

const sessionData = JSON.parse(sessionStorage.getItem("loginData"));
// const userID = sessionData.id;
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
  const apiEndPoint = config.baseUrl2 + config.apiName.friends;

  const userID = 1;
  try {
    const res = await services.get(apiEndPoint, { userID });
    if (res) {
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

const addExpense = async (payload) => {
  const apiEndPoint = config.baseUrl3 + config.apiEndPoints.saveExpense;
  try {
    const res = await services.post(apiEndPoint, payload);
    if (res) {
      return res;
    }
  } catch (err) {
    console.error(err);
  }
};

const getTableData = async (payload) => {
  const userID = 1;

  const apiEndPoint = config.baseUrl3 + config.apiName.getTableData;
  try {
    const res = await services.get(apiEndPoint, { userID });
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
