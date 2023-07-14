import ShowResponse from "../../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../../helpers/requestApi";
import InfoDoc from "../../components/InfoDoc";
import ButtonsVerifySellar from "../../components/ButtonsVerifySellar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AnexoForm() {
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
    data_raw +=
      "088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15"; // smart contract
    data_raw += '\\n {\\"hash\\":\\"';
    data_raw += output.dochash; //doc hash
    data_raw +=
      '\\"}","by":"NOTARIO","scope":"088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15"}}';
    sellarDoc(setResponse, setResult, output.dochash, data_raw);
    setShowMessage(false);
  };

  return (
    <div className="w-9/12 h-auto max-[380px]:h-4/6 overflow-auto text-[#6b7280] bg-white shadow-sm rounded-md flex flex-col gap-5  md:gap-10 items-center text-center py-7  px-8  ">
      {!showResult && (
        <>
          <h2 className="text-lg font-semibold">Sello con datos anexos</h2>
          <div className="flex max-md:flex-col  gap-9 md:gap-12 ">
            <form className="flex flex-col  gap-5 w-full ">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8  ">
                <div className="flex flex-col">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className=" rounded-lg border md:p-1  p-0  border-[#94a3b8]"
                    value={inputs.name || ""}
                    id="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="ape">Apellido</label>
                  <input
                    type="text"
                    name="ape"
                    className=" rounded-lg border md:p-1   p-0  border-[#94a3b8]"
                    value={inputs.ape || ""}
                    id="ape"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dtype">Tipo de documento</label>
                  <select
                    name="dtype"
                    value={inputs.dtype || ""}
                    className="rounded-lg border md:p-1  p-0  border-[#94a3b8]"
                    id="dtype"
                    onChange={handleChange}
                  >
                    <option value="DNI">DNI</option>
                    <option value="CI">CI</option>
                    <option value="LC">LC</option>
                    <option value="LE">LE</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="docnumber">Número</label>
                  <input
                    type="number"
                    name="docnumber"
                    className=" rounded-lg border md:p-1 p-0  border-[#94a3b8]"
                    value={inputs.docnumber || ""}
                    onChange={handleChange}
                    id="docnumber"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="obs">Observaciones</label>
                  <input
                    type="text"
                    name="obs"
                    className=" rounded-lg border md:p-1 p-0  border-[#94a3b8]"
                    value={inputs.obs || ""}
                    id="obs"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="text-input">{emailError}</label>
                  <input
                    type="email"
                    className=" rounded-lg border md:p-1  p-0 border-[#94a3b8]"
                    id="email-input"
                    placeholder="usuario@mail.com"
                    value={emailDir}
                    onChange={handleEmailInput}
                  />
                </div>
              </div>
            </form>
            <div className="flex flex-col justify-center gap-5 w-full max-md:items-center md:w-8/12 ">
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
                <p className="mt-2 text-md font-medium">
                  Arrastre y suelte el documento ...
                </p>
              </div>
              <div className="md:mb-4 mb-0 flex flex-col max-md:w-full">
                <label
                  htmlFor="file-input"
                  className={`${
                    showMessage && !showResult && "bg-slate-200 text-[#278cee]"
                  } transition-all duration-200  cursor-pointer text-md text-white font-medium p-2 max-[380px]:p-1 rounded-md bg-[#278cee] hover:bg-slate-200 hover:text-[#278cee]`}
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
            </div>
          </div>
        </>
      )}
      <div className="flex max-md:flex-col gap-5 items-center  max-md:w-full ">
        {showMessage && !showResult && (
          <InfoDoc output={output} file_Name={file_Name} />
        )}
        {showMessage && !showResult && emailOk && output.loading && (
          <ButtonsVerifySellar
            handleButtonSellar={handleButtonSellar}
            handleButtonVerificar={handleButtonVerificar}
          />
        )}
      </div>
      {showResult && (
        <ShowResponse
          showResponse={showResponse}
          backToInitialState={backToInitialState}
        />
      )}
    </div>
  );
}
