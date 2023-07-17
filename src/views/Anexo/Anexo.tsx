import ShowResponse from "../../components/ShowResponse";
import InfoDoc from "../../components/InfoDoc";
import ButtonsVerifySellar from "../../components/ButtonsVerifySellar";
import { Form, Formik } from "formik";
import { useState } from "react";
import { CustomInput } from "../../components/inputs/CustomInput";
import { CustomSelect } from "../../components/inputs/CustomSelect";
import { CustomFileInput } from "../../components/inputs/CustomFileInput";

export default function AnexoForm() {
  const [information, setInformation] = useState(false);

  return (
    <div className="w-9/12 h-auto max-[380px]:h-4/6 overflow-auto text-[#6b7280] bg-white shadow-sm rounded-md flex flex-col gap-5  md:gap-10 items-center text-center py-7  px-8  ">
      {!information && (
        <>
          <h2 className="text-lg font-semibold">Sello con datos anexos</h2>
          <div className="flex max-md:flex-col  gap-9 md:gap-12 ">
            <Formik initialValues={{}} onSubmit={() => {}}>
              <Form className="flex flex-col  gap-5 w-full ">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8  ">
                  <CustomInput
                    type="text"
                    label="Nombre"
                    name="name"
                    placeholder="nombre"
                  />

                  <CustomInput
                    type="text"
                    label="Apellido"
                    name="lastName"
                    placeholder="Apellido"
                  />
                  <CustomSelect
                    placeholder="documentos"
                    label="Tipo de documentos"
                    name="documents"
                    options={[
                      { value: "DNI", label: "DNI" },
                      { value: "CI", label: "CI" },
                      { value: "LC", label: "LC" },
                      { value: "LE", label: "LE" },
                    ]}
                  />

                  <CustomInput
                    label="Numero"
                    type="text"
                    name="number"
                    placeholder="Numero"
                  />
                  <CustomInput
                    label="Observaciones"
                    type="text"
                    name="observations"
                    placeholder="Observaciones"
                  />
                  <CustomInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                {/* <CustomFileInput /> */}
              </Form>
            </Formik>
          </div>
        </>
      )}
      <div className="flex max-md:flex-col gap-5 items-center  max-md:w-full ">
        {showMessage && !showResult && (
          <InfoDoc output={output} file_Name={file_Name} />
        )}
        {showMessage && !showResult && (
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

{
  /* <div className="flex flex-col justify-center gap-5 w-full max-md:items-center md:w-8/12 ">
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
            </div> */
}
