const config = Object.freeze({
  // baseUrl: "http://192.168.12.47:9092/", // Somya
  // baseUrl: "http://localhost:9092/", // Self
  // baseUrl: "http://192.168.12.41:9090/",
  baseUrl_sandeep: "http://192.168.12.16:9090/", // Sandeep
  // baseUrl: "http://192.168.12.51:9090/", // Dhruti Sir
  //   baseUrl: "https://crimarr.nyggs.com/backend/", // Staging
  // baseUrl: "http://192.168.30.33:8080/crimarr/",
  // baseUrl: "http://192.168.12.54:9090/", // Biswajit
  // baseUrl: "http://192.168.12.58:9090/", // Smruti
  // http://localhost:9090/expense/getbyid?userId=455
  baseUrl: "http://192.168.12.60:9090/",
  baseUrl2: "http://192.168.12.54:9090/",
  baseUrl3: "http://192.168.12.58:9090/",
  apiName: {
    signUp: "user/signUp",
    // signIn: "user/signIn",
    signIn: "user/signIn",
    categories: "categories/getAll",
    friends: "api/friendship/confirmed-friends",
    saveExpense: "expense/save",
    getTableData: "expense/getbyid",
  },
});

export default config;
