import React, { useState } from "react";
import { sha256 } from "crypto-hash";
import validator from "validator";
import ShowResponse from "../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../helpers/requestApi";
import { SpinnerDocHash } from "../components/Spinner";
import InfoDoc from "../components/InfoDoc";
import ButtonsVerifySellar from "../components/ButtonsVerifySellar";

export default function CertForm() {
	const [emailError, setEmailError] = useState("Ingrese un Email");
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
			setEmailError("El certificado se enviará a: " + email);
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
		data_raw += "7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"; // smart contract
		data_raw += "\\n {hash:'";
		data_raw += output.dochash; //doc hash
		data_raw +=
			'\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';
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
		setEmailError("Ingrese un Email");
	};

	return (
		<div className="container">
			<div className="container-content">
				{!showResult && (
					<div className="container-form-title animate__animated animate__fadeIn">
						<form>
							<h4 className="form-heading">Sello con certificado</h4>
							<div className="form-group cert-form-group">
								<label htmlFor="text-input">E-mail</label>
								<input
									type="email"
									className="form-control"
									id="email-input"
									placeholder="usuario@mail.com"
									value={emailDir}
									onChange={handleEmailInput}
								/>
								<p className="emailError">{emailError}</p>
							</div>
							<div
								className={activeAnimationDrag ? "is-active file-drag-drop " : "file-drag-drop "}
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
				{showMessage && !showResult && emailOk && output.loading && (
					<ButtonsVerifySellar
						handleButtonSellar={handleButtonSellar}
						handleButtonVerificar={handleButtonVerificar}
					/>
				)}
				{showResult && (
					<ShowResponse showResponse={showResponse} backToInitialState={backToInitialState} /> //component show response
				)}
			</div>
		</div>
	);
}
