import * as helperFun from "./helperFunction";

// const token = localStorage.getItem("token");
// console.log(token);
export const loginApi = (data) => helperFun.publicPostCall("/pub/login", data);

//get Apis
export const getCountry = () => helperFun.publicGet("/pub/country");

export const getStates = (stateVal) =>
  helperFun.publicGet(`/pub/states/${stateVal}`);

export const getIndustry = () =>
  helperFun.getWithToken(
    "/api/wholesalepricing/getIndustries",
    localStorage.getItem("token")
  );

export const getAllclient = () =>
  helperFun.getWithToken("/api/company/clients", localStorage.getItem("token"));

export const getAllMarkets = () =>
  helperFun.getWithToken(
    "/api/wholesalepricing/getMarkets",
    localStorage.getItem("token")
  );

//post Apis
export const addAdvertiser = (item) =>
  helperFun.postCall(
    "/api/company/client",
    item,
    localStorage.getItem("token")
  );

export const addCampaign = (data) =>
  helperFun.postCall("/api/campaign", data, localStorage.getItem("token"));

export const uploadFile = (data) =>
  helperFun.postCall(
    "/api/campaign/upload",
    data,
    localStorage.getItem("token")
  );

export const getAllcampaigns = () =>
  helperFun.postCallWithoutData(
    "/api/campaign/getAllCampaigns",
    localStorage.getItem("token")
  );

export const changePasswordFun = (item) =>
  helperFun.postCall(
    "/api/person/changePassword",
    item,
    localStorage.getItem("token")
  );