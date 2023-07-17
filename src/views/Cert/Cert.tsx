import ShowResponse from "../../components/ShowResponse";
import InfoDoc from "../../components/InfoDoc";
import ButtonsVerifySellar from "../../components/ButtonsVerifySellar";
import { Form, Formik } from "formik";
import { CustomInput } from "../../components/inputs/CustomInput";
import { CustomFileInput } from "../../components/inputs/CustomFileInput";
import { useState } from "react";
import { fileInfo } from "../../helpers/interfaces";

export default function CertForm() {
  const [showMessage, setShowMessage] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [fileInfo, setFileInfo] = useState<fileInfo>();

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
      {showMessage && !showResult && <InfoDoc file={fileInfo!} />}
      {/* {showMessage && !showResult && (
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
      )} */}
    </div>
  );
}
