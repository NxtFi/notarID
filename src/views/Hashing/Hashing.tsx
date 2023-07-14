import { useEffect } from "react";
import ShowResponse from "../../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../../helpers/requestApi";
import { useSearchParams } from "react-router-dom";
import InfoDoc from "../../components/InfoDoc";
import ButtonsVerifySellar from "../../components/ButtonsVerifySellar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function HashingForm() {
  const [params, setParams] = useSearchParams(); // hook for get params url

  //Render one time and verify if exist <dochash> params
  useEffect(() => {
    const dochash = params.get("dochash");
    if (dochash) {
      handleButtonVerificar();
      setResult(true); //added line to prevent show form
      setShowMessage(false); //added line to prevent show form
    }
  }, []);

  const handleButtonVerificar = async (e) => {
    //get params
    const dochash = params.get("dochash");
    // GET (Request).
    await verifyDoc(setResponse, setResult, dochash);
    setResult(true);
    setShowMessage(false);
  };

  const handleButtonSellar = async (e) => {
    //data that send to api
    let data_raw = '{"block":{"data":"// IMPORT ';
    data_raw +=
      "088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15"; // smart contract
    data_raw += '\\n {\\"hash\\":\\"';
    data_raw += output.dochash; //doc hash
    data_raw +=
      '\\"}","by":"NOTARIO","scope":"088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15"}}';
    //seal the doc
    sellarDoc(setResponse, setResult, output.dochash, data_raw);
    setShowMessage(false);
  };

  // console.log(showResponse);
  return (
    <div className="md:w-6/12 w-9/12 h-auto text-[#6b7280] bg-white shadow-sm rounded-md flex flex-col items-center text-center p-8">
      {!showResult && (
        <form className="flex flex-col gap-5 w-10/12   ">
          <h2 className="md:text-lg text-2xl font-semibold ">
            Sello de Tiempo
          </h2>
          <div
            className={`max-md:hidden ${
              activeAnimationDrag ? "bg-[#79b6f3] text-white border-white" : ""
            } p-10 border-2 border-dashed transition-all duration-300 ease-in-out`}
            onDrop={handleFileDragDrop}
            onDragOver={handleFileDragOver}
            onDragLeave={() => setActiveAnimationDrag(false)}
          >
            <FontAwesomeIcon className=" text-xl" icon={faUpload} />
            <p className="mt-2 text-md font-medium">
              Arrastre y suelte el documento ...
            </p>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="file-input"
              className={`${
                showMessage && !showResult && "bg-slate-200 text-[#278cee]"
              } transition-all duration- cursor-pointer text-md text-white font-medium p-2 rounded-md bg-[#278cee] hover:bg-slate-200 hover:text-[#278cee]`}
            >
              Selecciona archivo
            </label>
            <input
              type="file"
              className=" hidden"
              id="file-input"
              onChange={handleFileInput}
            />
          </div>
          <div></div>
        </form>
      )}

      {showMessage && !showResult && (
        <InfoDoc output={output} file_Name={file_Name} />
      )}
      {showMessage && !showResult && output.loading && (
        <ButtonsVerifySellar
          handleButtonSellar={handleButtonSellar}
          handleButtonVerificar={handleButtonVerificar}
        />
      )}
      {showResult && (
        <ShowResponse
          showResponse={showResponse}
          backToInitialState={backToInitialState}
        />
      )}
    </div>
  );
}
