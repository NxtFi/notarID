import React, { useEffect, useState } from "react";
import { sha1, sha256, sha384, sha512 } from "crypto-hash";
import ShowResponse from "../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../helpers/requestApi";
import { useSearchParams } from "react-router-dom";
import InfoDoc from "../components/InfoDoc";
import ButtonsVerifySellar from "../components/ButtonsVerifySellar";

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
	console.log('hola')

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
		data_raw += "\\n {hash:'";
		data_raw += output.dochash; //doc hash
		data_raw +=
			'\'}","by":"NOTARIO","scope":"dc84d53faa57e49723397454bef9a6ec2c60d9f9c390dd370cbf483b25a823e7"}}';
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
		<div className="container">
			<div className="container-content  ">
				{!showResult && (
					<div className="container-form-title  animate__animated animate__fadeIn">
						<form>
							<h4 className="form-heading">Sello de Tiempo</h4>
							<div
								className={
									activeAnimationDrag
										? "is-active file-drag-drop custom-drag-drop"
										: "file-drag-drop custom-drag-drop"
								}
								onDrop={handleFileDragDrop}
								onDragOver={handleFileDragOver}
								onDragLeave={() => setActiveAnimationDrag(false)}
							>
								<p>Arrastre y suelte el documento ...</p>
							</div>
							<div>
								<label htmlFor="file-input" className="custom-file-upload">
									Selecciona archivo
								</label>
								<input type="file" className="form-control" id="file-input" onChange={handleFileInput} />
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
