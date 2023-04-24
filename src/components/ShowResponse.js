import React from "react";
import { FaCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import CheckIcon from "./Icons/Check/CheckIcon";
import XmarkIcon from "./Icons/Xmark/XmarkIcon";


const ShowResponse = ({ showResponse, backToInitialState }) => {
  const handleCopyClipboard = (hashdoc) => {
    copy(hashdoc);
    toast.success("Copiado al portapapeles", {
      gutter: 1,
      id: "clipboard",
      duration: 1000,
      iconTheme: {
        primary: "black",
        secondary: "#fff",
      },
      className: " notify-copy animate__animated animate__fadeIn",
    });
  };

  return (
    <div className="w-full flex flex-col gap-7 px-8">
      {showResponse.sellado &&
        showResponse.msg.includes("Documento sellado") && (
          <h4 className="text-lg font-semibold">{showResponse.msg}</h4>
        )}
      <div className="">
        {showResponse.loading ? (
          showResponse.sellado && showResponse.data.timestamp ? (
            <div className="text-left grid gap-4 overflow-auto">
              <div className="">
                <h3 className="font-semibold">Hash del documento:</h3>
                <div className="">
                  <p className="text-sm">{showResponse.data.hashdoc}</p>
                  <button
                    onClick={() =>
                      handleCopyClipboard(showResponse.data.hashdoc)
                    }
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
              <div className="grid gap-1 ">
                <h3 className="font-semibold">Hash del bloque:</h3>
                <p className="text-sm">{showResponse.data.hash}</p>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Timestamp:</h3>
                <p className="text-sm">{showResponse.data.timestamp}</p>
              </div>
              <div className="grid gap-1 ">
                <h3 className="font-semibold">Fecha y hora:</h3>
                <p className="text-sm">{showResponse.data.date}</p>
              </div>
            </div>
          ) : (
            <div className="">
              {
                showResponse.msg === "Sin resultado" || showResponse.msg === "Documento no sellado" ? <XmarkIcon /> : <CheckIcon />
              }
              <p className="hashed-algorithm-text mt-4">{showResponse.msg}</p>
            </div>
          )
        ) : (
          <div className="w-full flex  justify-center">
            <ThreeCircles
              height="100"
              width="100"
              color="#278cee"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        )}
      </div>
      <button
        type="button"
        className="p-2 text-sm text-white mt-2 bg-[#278cee] rounded-md"
        onClick={backToInitialState}
      >
        Volver a verificar / sellar
      </button>
    </div>
  );
};

export default ShowResponse;
