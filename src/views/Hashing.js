import React, { useEffect, useState } from "react";
import { sha1, sha256, sha384, sha512 } from "crypto-hash";
import ShowResponse from "../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../helpers/requestApi";
import { useSearchParams } from "react-router-dom";
import InfoDoc from "../components/InfoDoc";
import ButtonsVerifySellar from "../components/ButtonsVerifySellar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function HashingForm() {
	const [params, setParams] = useSearchParams(); // hook for get params url
	const [output, setOutput] = useState({ dochash: "", loading: false }); //save dochash
	const [showMessage, setShowMessage] = useState(false); //toogle for show information and buttons
	const [showResult, setResult] = useState(false); //toogle for show api result
	const [file_Name, setFileName] = useState(""); //save name file load
	const [activeAnimationDrag, setActiveAnimationDrag] = useState(false); //toogle for active animation
	const [showResponse, setResponse] = useState({
		msg: "Sin resultado",
		data: {},
		sellado: false,
		loading: false,
	}); //state for save api response
	console.log(output.dochash)
	//Render one time and verify if exist <dochash> params
	useEffect(() => {
		const dochash = params.get("dochash");
		if (dochash) {
			handleButtonVerificar();
			setResult(true); //added line to prevent show form
			setShowMessage(false); //added line to prevent show form
		}
	}, []);

	const handleFileDragDrop = (e) => {
		// Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
		e.preventDefault();
		setShowMessage(false);
		setOutput({ dochash: "", loading: false });
		setActiveAnimationDrag(false);
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
					//setting params in url
					setParams({
						dochash: result,
					});
				};
				// setFileInput(fr.result);
				setShowMessage(true);
			}
		} else {
			// Usar la interfaz DataTransfer para acceder a el/los archivos
			for (let i = 0; i < e.dataTransfer.files.length; i++) {
				console.log("... file[" + i + "].name = " + e.dataTransfer.files[i].name);
			}
		}
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
			setParams({
				dochash: result,
			});

			// Setting the content of the file as file input
			e.target.value = null;
		};
		setShowMessage(true);

		// Reading the file.
		fr.readAsText(e.target.files[0]);
		setFileName(e.target.files[0].name);
		// console.log(e.target.files[0].name);
	};

	const handleFileDragOver = (e) => {
		setActiveAnimationDrag(true);
		//console.log('File(s) in drop zone');
		// Prevent default behavior (Prevent file from being opened)
		e.preventDefault();
	};

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
		data_raw += "dc84d53faa57e49723397454bef9a6ec2c60d9f9c390dd370cbf483b25a823e7"; // smart contract
		data_raw += '\\n {\\"hash\\":\\"';
		data_raw += output.dochash; //doc hash
		data_raw += '\\"}","by":"NOTARIO","scope":"dc84d53faa57e49723397454bef9a6ec2c60d9f9c390dd370cbf483b25a823e7"}}';
		//seal the doc
		sellarDoc(setResponse, setResult, output.dochash, data_raw);
		setShowMessage(false);
	};

	const backToInitialState = (e) => {
		//reset state
		setOutput({ dochash: "", loading: false });
		setResponse({});
		setResult(false);
		setShowMessage(false);
		params.delete("dochash");
		setParams(params);
	};
	// console.log(showResponse);
	return (
		<div className=" w-6/12 h-auto bg-white shadow-sm rounded-md flex flex-col items-center text-center p-8 ">
			<div className="  ">
				{!showResult && (
					<div className="container-form-title  animate__animated animate__fadeIn">
						<form className="flex flex-col gap-5">
							<h2 className="text-lg font-black text-[#a6a9b1]">Sello de Tiempo</h2>
							<div
								className={`${
									activeAnimationDrag
										? ""
										: ""
								} p-10 border-2 border-dashed`}
								onDrop={handleFileDragDrop}
								onDragOver={handleFileDragOver}
								onDragLeave={() => setActiveAnimationDrag(false)}
							>
								<FontAwesomeIcon className="text-[#a6a9b1] text-xl"  icon={faUpload}/>
								<p className="mt-2 text-md font-medium">Arrastre y suelte el documento ...</p>
							</div>
							<div className="flex flex-col">
								<label htmlFor="file-input" className="transition-all duration- cursor-pointer text-md text-white font-medium p-2 rounded-md bg-[#278cee] hover:bg-slate-200 hover:text-[#278cee]">
									Selecciona archivo
								</label>
								<input type="file" className=" hidden" id="file-input" onChange={handleFileInput} />
							</div>
							<div>

							</div>
						</form>
					</div>
				)}
				{showMessage && !showResult && <InfoDoc output={output} file_Name={file_Name} />}
				{showMessage && !showResult && output.loading && (
					<ButtonsVerifySellar
						handleButtonSellar={handleButtonSellar}
						handleButtonVerificar={handleButtonVerificar}
					/>
				)}
				{showResult && (
					<ShowResponse showResponse={showResponse} backToInitialState={backToInitialState} />
				)}
			</div>
		</div>
	);
}
