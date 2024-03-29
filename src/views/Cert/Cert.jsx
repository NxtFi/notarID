import React, { useState } from "react";
import { sha256 } from "crypto-hash";
import validator from "validator";
import ShowResponse from "../../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../../helpers/requestApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import InfoDoc from "../../components/InfoDoc";
import ButtonsVerifySellar from "../../components/ButtonsVerifySellar";

export default function CertForm() {
  const [emailError, setEmailError] = useState("Ingrese Un Email");
  const [emailOk, setEmailOk] = useState(false);
  const [emailDir, setEmailDir] = useState("");
  let [output, setOutput] = useState({ dochash: "", loading: false });
  let [file_Name, setFileName] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [activeAnimationDrag, setActiveAnimationDrag] = useState(false);
  const [showResult, setResult] = useState(false);
  const [showResponse, setResponse] = useState({
    msg: "Sin resultado",
    data: {},
    sellado: false,
    loading: false,
  });

  //For handling text input
  const handleEmailInput = async (e) => {
    // Get the value
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
      setEmailOk(true);
    } else {
      setEmailError("Ingrese un Email válido!");
      setEmailOk(false);
    }
    setEmailDir(email);
  };

  //For handling file input
  const handleFileInput = (e) => {
    e.preventDefault();
    setOutput({ dochash: "", loading: false });
    setShowMessage(false);
    // Initializing the file reader
    const fr = new FileReader();

    // Listening to when the file has been read.
    fr.onload = async () => {
      let result = "";

      // Hashing the content based on the active algorithm

      result = await sha256(fr.result);

      // Setting the hashed text as the output
      setOutput({ dochash: result, loading: true });

      // Setting the content of the file as file input
      e.target.value = null;
    };

    setShowMessage(true);
    // Reading the file.
    fr.readAsText(e.target.files[0]);
    setFileName(e.target.files[0].name);
    // console.log(e.target.files[0].name);
  };

  const handleFileDragDrop = (e) => {
    // console.log("Fichero(s) arrastrados");
    e.preventDefault();
    setShowMessage(false);
    setOutput({ dochash: "", loading: false });
    setActiveAnimationDrag(false);

    // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)

    if (e.dataTransfer.files) {
      // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        let file = e.dataTransfer.files[i];
        // console.log("... file[" + i + "].name = " + file.name);
        setFileName(file.name);

        const fr = new FileReader();
        fr.readAsText(e.dataTransfer.files[i]);

        fr.onload = async () => {
          let result = "";
          result = await sha256(fr.result);
          // Setting the hashed text as the output
          setOutput({ dochash: result, loading: true });
          // Setting the content of the file as file input
        };
        setShowMessage(true);
      }
    } else {
      // Usar la interfaz DataTransfer para acceder a el/los archivos
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        // console.log("... file[" + i + "].name = " + e.dataTransfer.files[i].name);
      }
    }
  };

  const handleFileDragOver = (e) => {
    setActiveAnimationDrag(true);
    //console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
  };

  const handleButtonVerificar = (e) => {
    // GET (Request).
    verifyDoc(setResponse, setResult, output.dochash);
    setResult(true);
  };

  const handleButtonSellar = async (e) => {
    let data_raw = "{";
    data_raw += '"email":"';
    data_raw += emailDir;
    data_raw += '",';
    data_raw += '"block":{"data":"// IMPORT ';
    data_raw += "088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15"; // smart contract
    data_raw += '\\n {\\"hash\\":\\"';
    data_raw += output.dochash; //doc hash
    data_raw += '\\"}","by":"NOTARIO","scope":"088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15"}}';
    sellarDoc(setResponse, setResult, output.dochash, data_raw);
    setShowMessage(false);
  };

  const backToInitialState = (e) => {
    setOutput({ dochash: "", loading: false });
    setResponse({});
    setResult(false);
    setShowMessage(false);
    setEmailOk(false);
    setEmailDir("");
    setEmailError("Ingrese Un Email");
  };

  return (
    <div className="md:w-6/12 w-9/12 h-auto gap-2 text-[#6b7280] bg-white shadow-sm rounded-md flex flex-col items-center text-center px-7 py-6 ">
      {!showResult && (
        <>
          <h2 className="md:text-lg text-2xl font-semibold">Sello con certificado</h2>
          <form className="flex flex-col gap-5  w-full md:w-10/12 max-md:p-1 ">
            <div className="flex flex-col gap-2">
              <p className=" text-left">{emailError}</p>
              <input
                type="email"
                className="py-1 px-4 rounded-xl border border-[#94a3b8]"
                id="email-input"
                placeholder="usuario@mail.com"
                value={emailDir}
                onChange={handleEmailInput}
              />
            </div>
            <div
              className={`${
                activeAnimationDrag
                  ? "bg-[#79b6f3] text-white border-white"
                  : ""
              } p-7 border-2 border-dashed transition-all duration-300 ease-in-out max-md:hidden`}
              onDrop={handleFileDragDrop}
              onDragOver={handleFileDragOver}
              onDragLeave={() => setActiveAnimationDrag(false)}
            >
              <FontAwesomeIcon className=" text-xl" icon={faUpload} />
              <p classname="mt-2 text-md font-medium">
                Arrastre y suelte el documento ...
              </p>
            </div>
            <div className="mb-4  flex flex-col">
              <label
                htmlFor="file-input"
                className={`${showMessage && !showResult && "bg-slate-200 text-[#278cee]"}transition-all duration-200 strecth cursor-pointer text-md text-white font-medium p-2 rounded-md bg-[#278cee] hover:bg-slate-200 hover:text-[#278cee]`}
              >
                Selecciona archivo
              </label>
              <input
                type="file"
                className="hidden"
                id="file-input"
                onChange={handleFileInput}
              />
            </div>
          </form>
        </>
      )}
      {showMessage && !showResult && (
        <InfoDoc output={output} file_Name={file_Name} />
      )}
      {showMessage && !showResult && emailOk && output.loading && (
        <ButtonsVerifySellar
          handleButtonSellar={handleButtonSellar}
          handleButtonVerificar={handleButtonVerificar}
        />
      )}
      {showResult && (
        <ShowResponse
          showResponse={showResponse}
          backToInitialState={backToInitialState}
        /> //component show response
      )}
    </div>
  );
}
