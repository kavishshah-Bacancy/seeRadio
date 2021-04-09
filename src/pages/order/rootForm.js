import React, { useState } from "react";
import Stepper from "../../component/Stepper/Stepper";
import AddnewAdvertiser from "./Addnewadvertiser/addNewAdvertiser";
import AddnewOrder from "./AddnewOrder/addNewOrder";
import Test from "./Test/test";
import "./rootForm.css";
import axios from "axios";
import { connect } from "react-redux";
import {
  addAdvertiser,
  addCampaign,
  getStates,
  uploadFile,
} from "../../Api/api";
import Spinner from "../../component/Spinner/spinner";

const Rootform = (props) => {
  const [newAdvertiser, setNewAdvertiser] = useState({
    companyName: "",
    website: "",
    industryCategory: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    addressLine2: "",
    city: "",
    country: "",
    state: "",
    provinceID: "",
    postal: "",
    secondaryContact: {
      secFirstName: "",
      secLastName: "",
      secEmail: "",
      secPhone: "",
    },
    secondaryAddress: {
      secAddress: "",
      secAddressLine2: "",
      secCity: "",
      secCountry: "",
      secState: "",
      secProvinceID: "",
      secPostal: "",
    },
  });
  const [newAdvResponse, setNewAdvResponse] = useState();
  const [countryValFlag, setCountyValueFlag] = useState(true);
  const [states, setState] = useState([]);

  const [secCountryValFlag, setSecCountryValueFlag] = useState(true);
  const [secStates, setSecState] = useState([]);

  const [secContactFlag, setSecContactFlag] = useState(false);
  const [billingAddressFlag, setBillingAddressFlag] = useState(false);
  const [newOrder, setNewOrder] = useState({
    clientCompanyID: "",
    advertiser: "",
    title: "",
    landingpageURL: "",
    price: "",
    description: "",
    targetMarket: "",
    budget: "",
    soaID: "f96b3749-25b9-462c-a078-604d03c5b0b4",
    sosID: "87c21c7f-b104-4645-983c-515b97c23b61",
    salesOrgCompanyID: "02691405-1e17-4ebe-9709-437b8b2ffeeb",
    statusByPersonID: "87c21c7f-b104-4645-983c-515b97c23b61",
    statusWithPersonID: "45ac52d4-7d59-4ef6-9a31-905bfee594ba",
  });

  const [test, setTest] = useState({
    scriptFile: "",
    audioFile: "",
    advAssetFile: [],
  });

  let date = new Date(Date.now());
  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [script, setScript] = useState({
    fileName: "",
    uploadDate: formattedDate.split(" ").join("-"),
    uploadBy: props.user.firstName + " " + props.user.lastName,
  });

  const [audio, setAudio] = useState({
    fileName: "",
    uploadDate: formattedDate.split(" ").join("-"),
    uploadBy: props.user.firstName + " " + props.user.lastName,
  });

  const [asset, setAsset] = useState([]);

  const [scriptFlag, setScriptFlag] = useState();
  const [audioFlag, setAudioFlag] = useState();
  const [advAssetFlag, setAdvAssetFlag] = useState();
  const [campaignID, setCampaignID] = useState();

  const [step, setStep] = useState(1);
  const [spinner, setSpinner] = useState(false);
  const [fileSpinnerFlag, setFileSpinnerFlag] = useState(false);
  function generateFormData(file, type) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("campaignID", campaignID);
    formData.append("type", type);
    formData.append("uploadedBy", localStorage.getItem("id"));

    if (type === "OTHER") {
      formData.append("clientID", newOrder.statusWithPersonID);
    }
    return formData;
  }

  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };
  const nextStep = () => {
    //setStep(step + 1);

    let flag = false;
    if (step === 1) {
      for (let key in newAdvertiser) {
        console.log(key);
        if (key === "secondaryContact" && secContactFlag) {
          for (let seckey in newAdvertiser.secondaryContact) {
            if (newAdvertiser.secondaryContact[seckey] === "") flag = true;
            break;
          }
        } else if (key === "secondaryAddress" && billingAddressFlag) {
          for (let secAddkey in newAdvertiser.secondaryAddress) {
            if (newAdvertiser.secondaryAddress[secAddkey] === "") flag = true;
            break;
          }
        } else {
          if (newAdvertiser[key] === "") flag = true;
        }
      }
    } else if (step === 2) {
      for (let key in newOrder) {
        console.log(key + " " + newOrder[key]);
        if (newOrder[key] === "") flag = true;
      }
    }

    if (!flag) {
      if (step === 1) {
        let client = {
          companyName: newAdvertiser.companyName,
          industryID: newAdvertiser.industryCategory,
          companyWebsite: newAdvertiser.website,
          companyType: "Client",
          contactAddress: {
            business: {
              address: newAdvertiser.address,
              address2: newAdvertiser.addressLine2,
              city: newAdvertiser.city,
              postal: newAdvertiser.postal,
              country: newAdvertiser.country,
              state: newAdvertiser.state,
              provinceID: newAdvertiser.provinceID,
            },
            billing: {
              address: newAdvertiser.secondaryAddress.secAddress,
              address2: newAdvertiser.secondaryAddress.secAddressLine2,
              city: newAdvertiser.secondaryAddress.secCity,
              state: newAdvertiser.secondaryAddress.secState,
              postal: newAdvertiser.secondaryAddress.secPostal,
              country: newAdvertiser.secondaryAddress.secCountry,
              provinceID: newAdvertiser.secondaryAddress.secProvinceID,
            },
            useSame: !billingAddressFlag,
          },
          addressType: "Billing",
          firstName: newAdvertiser.firstName,
          lastName: newAdvertiser.lastName,
          email: newAdvertiser.email,
          phone: newAdvertiser.phone,
          secondaryContact: {
            firstName: newAdvertiser.secondaryContact.secFirstName,
            lastName: newAdvertiser.secondaryContact.secLastName,
            email: newAdvertiser.secondaryContact.secEmail,
            phone: newAdvertiser.secondaryContact.secPhone,
          },
          roleCode: "CLIENT",
          createdByPerson: props.user.id,
        };
        console.log(client);
        setSpinner(true);
        addAdvertiser(client)
          .then((res) => {
            console.log(res);
            setNewOrder({
              ...newOrder,
              advertiser: res.salesOrgCompany.companyName,
              soaID: res.salesOrgCompany.soaID,
              sosID: res.salesOrgCompany.sosID,
              salesOrgCompanyID: res.salesOrgCompany.parentSalesOrgCompanyID,
              statusByPersonID: res.person.createdByPerson,
              statusWithPersonID: res.salesOrgCompany.clientPersonID,
              clientCompanyID: res.salesOrgCompany.id,
              landingpageURL: res.salesOrgCompany.companyWebsite,
            });
            setSpinner(false);
            setStep(step + 1);
          })
          .catch((error) => {
            setSpinner(false);
            console.log(error.errorMessage);
          });
      } else if (step === 2) {
        let campaign = {
          clientCompanyID: newOrder.clientCompanyID,
          title: newOrder.title,
          description: newOrder.description,
          landingpageURL: newOrder.landingpageURL,
          targetMarket: newOrder.targetMarket,
          distributionBudget: newOrder.budget,
          price: newOrder.price,
          soaID: newOrder.soaID,
          sosID: newOrder.sosID,
          salesOrgCompanyID: newOrder.salesOrgCompanyID,
          statusByPersonID: newOrder.statusByPersonID,
          statusWithPersonID: newOrder.statusWithPersonID,
        };
        console.log(campaign);
        setSpinner(true);
        addCampaign(campaign)
          .then((res) => {
            console.log(res);
            setCampaignID(res.history.campaignID);
            setSpinner(false);
            setStep(step + 1);
          })
          .catch((error) => {
            setSpinner(false);
            console.log(error);
          });
      }
    } else {
      alert("Please Fill out all field");
    }
  };

  const handleCheckbox = (e) => {
    console.log(e.target.name, " ", e.target.checked);
    if (e.target.name === "secContactFlag") {
      setSecContactFlag(e.target.checked);
    } else if (e.target.name === "billingAddressFlag") {
      setBillingAddressFlag(e.target.checked);
    }
  };

  // For setting States (For US/Canada)==>
  const settingState = (stateVal, name) => {
    getStates(stateVal).then((res) => {
      let arr = [];
      for (let key in res) {
        arr.push({
          id: res[key].code,
          name: res[key].name,
          provinceId: res[key].id,
        });
      }
      if (name === "country") setState(arr);
      if (name === "secCountry") setSecState(arr);
    });

    // axios.get(`http://localhost:3000/pub/states/${stateVal}`).then((res) => {
    //   console.log(res.data.data);
    //   let arr = [];
    //   for (let key in res.data.data) {
    //     arr.push({
    //       id: res.data.data[key].code,
    //       name: res.data.data[key].name,
    //       provinceId: res.data.data[key].id,
    //     });
    //   }
    //   if (name === "country") setState(arr);
    //   if (name === "secCountry") setSecState(arr);
    //   console.log(states);
    // });
  };
  const handleChange = (name, value) => {
    console.log(name + " " + value);
    if (
      name === "secFirstName" ||
      name === "secLastName" ||
      name === "secEmail" ||
      name === "secPhone"
    ) {
      setNewAdvertiser({
        ...newAdvertiser,
        secondaryContact: {
          ...newAdvertiser.secondaryContact,
          [name]: value,
        },
      });
    } else if (
      name === "secAddress" ||
      name === "secAddressLine2" ||
      name === "secCity" ||
      name === "secCountry" ||
      name === "secState" ||
      name === "secPostal"
    ) {
      if (name === "secCountry") {
        if (value !== "") {
          setSecCountryValueFlag(false);
          settingState(value, name);
        } else setSecCountryValueFlag(true);
        setNewAdvertiser({
          ...newAdvertiser,
          secondaryAddress: {
            ...newAdvertiser.secondaryAddress,
            [name]: value,
          },
        });
      }

      if (name === "secState") {
        let val = JSON.parse(value);
        console.log(val.id, val.provinceId);
        setNewAdvertiser({
          ...newAdvertiser,
          secondaryAddress: {
            ...newAdvertiser.secondaryAddress,
            secState: val.id,
            secProvinceID: val.provinceId,
          },
        });
      }

      if (name !== "secState" && name !== "secCountry") {
        setNewAdvertiser({
          ...newAdvertiser,
          secondaryAddress: {
            ...newAdvertiser.secondaryAddress,
            [name]: value,
          },
        });
      }
    } else if (name === "country") {
      if (value !== "") {
        setCountyValueFlag(false);
        settingState(value, name);
      } else setCountyValueFlag(true);
      setNewAdvertiser({ ...newAdvertiser, [name]: value });
    } else {
      if (name === "state") {
        let val = JSON.parse(value);
        console.log(val.id, val.provinceId);
        setNewAdvertiser({
          ...newAdvertiser,
          state: val.id,
          provinceID: val.provinceId,
        });
      } else setNewAdvertiser({ ...newAdvertiser, [name]: value });

      console.log(newAdvertiser);
    }
  };

  const handleNewOrderChange = (name, value) => {
    if (name === "advertiser" || name === "targetMarket") {
      let val = JSON.parse(value);
      console.log(val);
      setNewOrder({
        ...newOrder,
        [name]: name === "advertiser" ? val.companyName : val.name,
      });
    } else setNewOrder({ ...newOrder, [name]: value });
  };

  const scriptFileSubmitHandler = (file) => {
    if (file.length !== 0) {
      setScriptFlag(true);
      setFileSpinnerFlag(true);
      let formData = generateFormData(file[0], "SCRIPT");
      uploadFile(formData)
        .then((res) => {
          console.log(res);
          setFileSpinnerFlag(false);
          setTest({ ...test, scriptFile: res.data[0].assetUrl });
        })
        .catch((error) => {
          console.log(error.errorMessage);
        });
      setScript({
        ...script,
        fileName: file[0].name,
      });
    } else {
      alert("Choose Only one File with format Pdf/Doc/Docx");
    }
  };

  const audioFileSubmitHandler = (file) => {
    if (file.length !== 0) {
      setTest({ ...test, audioFile: file[0].name });
      setAudioFlag(true);
      setFileSpinnerFlag(true);
      let formData = generateFormData(file[0], "AUDIO");
      uploadFile(formData)
        .then((res) => {
          console.log(res);
          setFileSpinnerFlag(false);
          setTest({ ...test, audioFile: res.data[0].assetUrl });
        })
        .catch((error) => {
          console.log(error.errorMessage);
        });
      setAudio({
        ...audio,
        fileName: file[0].name,
      });
    } else {
      alert("Choose Only one File with format .mp3/.mp4");
    }
  };
  const advAssetsSubmitHandler = (file) => {
    let arr = [];
    if (file.length !== 0) {
      file.map((item) => {
        console.log(item);
        let formData = generateFormData(item, "OTHER");
        setFileSpinnerFlag(true);
        uploadFile(formData)
          .then((res) => {
            console.log(res);
            setTest({ ...test, audioFile: res.data[0].assetUrl });
            setFileSpinnerFlag(false);
          })
          .catch((error) => {
            console.log(error.errorMessage);
          });
        let filesArr = {
          fileName: item.name,
          uploadDate: formattedDate.split(" ").join("-"),
          uploadBy: props.user.firstName + " " + props.user.lastName,
        };
        arr.push(filesArr);
      });

      let refreshData = [...asset];
      for (let key in arr) {
        refreshData.push(arr[key]);
      }
      setAsset(refreshData);
    }
  };

  //If user Upload using upload button , changeHandler for that
  const uploadFileHandler = (e) => {
    if (e.target.name === "scriptFile") {
      setScriptFlag(true);
      setScript({
        ...script,
        fileName: e.target.files[0].name,
      });
      let formData = generateFormData(e.target.files[0], "SCRIPT");
      uploadFile(formData)
        .then((res) => {
          setTest({ ...test, scriptFile: res.data[0].assetUrl });
          console.log(res.data[0].assetUrl);
        })
        .catch((error) => {
          console.log(error.errorMessage);
        });
    } else if (e.target.name === "audioFile") {
      setAudioFlag(true);
      let formData = generateFormData(e.target.files[0], "AUDIO");
      uploadFile(formData)
        .then((res) => {
          console.log(res);
          setTest({ ...test, audioFile: res.data[0].assetUrl });
        })
        .catch((error) => {
          console.log(error.errorMessage);
        });
      setAudio({
        ...audio,
        fileName: e.target.files[0].name,
      });
    } else {
      let files = document.getElementById("adv-file-upload").files;
      let arr = [];
      for (let i = 0; i < files.length; i++) {
        let filesArr = {
          fileName: files[i].name,
          uploadDate: formattedDate.split(" ").join("-"),
          uploadBy: props.user.firstName + " " + props.user.lastName,
        };
        arr.push(filesArr);
      }
      let refreshData = [...asset];
      for (let key in arr) {
        refreshData.push(arr[key]);
      }

      setAsset(refreshData);
    }
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const orderData = {
      personalInfo: newAdvertiser,
      orderInfo: newOrder,
      assestFile: test,
    };
    console.log(orderData);
  };

  const stepsArray = ["Add Advertiser", "Add Order", "Add Assets"];
  const stepper = (
    <div className="stepper-container-horizontal">
      <Stepper
        direction="horizontal"
        currentStepNumber={step - 1}
        steps={stepsArray}
        stepColor="#4da6ff"
      />
    </div>
  );
  switch (step) {
    case 1:
      return (
        <>
          {stepper}
          <AddnewAdvertiser
            newAdvertiser={newAdvertiser}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            handleCheckbox={handleCheckbox}
            secContactFlag={secContactFlag}
            billingAddressFlag={billingAddressFlag}
            countryValFlag={countryValFlag}
            states={states}
            secCountryValFlag={secCountryValFlag}
            secStates={secStates}
            spinner={spinner}
          />
        </>
      );
    case 2:
      return (
        <>
          {stepper}
          <AddnewOrder
            newOrder={newOrder}
            handleNewOrderChange={handleNewOrderChange}
            nextStep={nextStep}
            prevStep={prevStep}
            spinner={spinner}
          />
        </>
      );
    case 3:
      return (
        <>
          {stepper}
          <Test
            nextStep={nextStep}
            prevStep={prevStep}
            scriptFileSubmitHandler={scriptFileSubmitHandler}
            audioFileSubmitHandler={audioFileSubmitHandler}
            advAssetsSubmitHandler={advAssetsSubmitHandler}
            scriptFlag={scriptFlag}
            audioFlag={audioFlag}
            advAssetFlag={advAssetFlag}
            uploadFileHandler={uploadFileHandler}
            onsubmitHandler={onsubmitHandler}
            script={script}
            audio={audio}
            asset={asset}
            test={test}
            fileSpinnerFlag={fileSpinnerFlag}
          />
        </>
      );
    default:
      return <AddnewAdvertiser />;
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.activeUser,
  };
};
export default connect(mapStateToProps)(Rootform);
