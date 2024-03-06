import React from "react";
import groupAction from "../../actions/groupAction";

const GroupComponent = () => {
  const handleGetGroupById = React.useCallback(async (e) => {
    // console.log("holaaaa");
    // e.preventDefault();

    const loginData = JSON.parse(sessionStorage.getItem("loginData"));
    const userId = loginData?.id;

    const params = {
      userID: userId,
    };

    try {
      const response = groupAction.GroupById(params);

      if (response && (response.status === 200 || response.status === 201)) {
        console.log("group response:", response);
      } else {
        console.log("group error response:", response);
      }
    } catch (error) {
      console.error("something went wrong! ", error);
    }
  }, []);

  React.useEffect(() => {
    handleGetGroupById();
  }, [handleGetGroupById]);
  return <div>GroupComponent</div>;
};

export default GroupComponent;
