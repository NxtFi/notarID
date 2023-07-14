import { sha256 } from "crypto-hash";
import ShowResponse from "../../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../../helpers/requestApi";
import InfoDoc from "../../components/InfoDoc";
import ButtonsVerifySellar from "../../components/ButtonsVerifySellar";
import { Form, Formik } from "formik";
import { CustomInput } from "../../components/inputs/CustomInput";
import { CustomFileInput } from "../../components/inputs/CustomFileInput";

export default function CertForm() {
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
    <div className="md:w-6/12 w-9/12 h-auto gap-2 text-[#6b7280] bg-white shadow-sm rounded-md flex flex-col items-center text-center px-7 py-6 ">
      {!showResult && (
        <>
          <h2 className="md:text-lg text-2xl font-semibold">
            Sello con certificado
          </h2>
          <Formik initialValues={{}} onSubmit={() => {}} validationSchema={{}}>
            <Form className="flex flex-col gap-5  w-full md:w-10/12 max-md:p-1 ">
              <div className="flex flex-col gap-2">
                <CustomInput
                  label="Ingrese un correo electrónico"
                  name="email"
                  type="email"
                  placeholder="ejemplo@gmail.com"
                />
              </div>
              <CustomFileInput
                showMessage={showMessage}
                showResult={showResult}
                name="file"
              />
            </Form>
          </Formik>
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
