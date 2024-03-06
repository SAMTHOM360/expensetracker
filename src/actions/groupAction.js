import config from "../config/config";
import services from "../services/services";

const GroupById = async (params) => {
  const apiEndPoint = config.baseUrl + config.apiName.getGroupById;

  try {
    const response = await services.get(apiEndPoint, params);

    if (response) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

const groupAction = { GroupById };

export default groupAction;
