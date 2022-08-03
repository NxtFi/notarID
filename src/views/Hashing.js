import React, { useState } from "react";
import { sha1, sha256, sha384, sha512 } from "crypto-hash";
import ShowResponse from "../components/ShowResponse";
import { sellarDoc, verifyDoc } from "../helpers/requestApi";
import { useNavigate } from "react-router-dom";

export default function HashingForm() {
	let navigate = useNavigate();

	const [algorithms] = useState(["sha1", "sha256", "sha384", "sha512"]);
	// let [text_input, setTextInput] = useState("");
	let [file_input, setFileInput] = useState("");
	let [algorithm, setAlgorithm] = useState("sha256");
	let [output, setOutput] = useState("");

	const [showMessage, setShowMessage] = useState(false);
	const [showResult, setResult] = useState(false);
	const [activeAnimationDrag, setActiveAnimationDrag] = useState(false);
	const [showResponse, setResponse] = useState({
		msg: "Sin resultado",
		data: {},
		sellado: false,
		loading: false,
	});
	let [file_Name, setFileName] = useState("");

	//For handling file input
	const handleFileInput = (e) => {
		// Initializing the file reader
		const fr = new FileReader();

		// Listening to when the file has been read.
		fr.onload = async () => {
			let result = "";

			// Hashing the content based on the active algorithm
			if (algorithm === "sha1") {
				result = await sha1(fr.result);
			} else if (algorithm === "sha256") {
				result = await sha256(fr.result);
			} else if (algorithm === "sha384") {
				result = await sha384(fr.result);
			} else if (algorithm === "sha512") {
				result = await sha512(fr.result);
			}

			// Setting the hashed text as the output
			setOutput(result);

			// Setting the content of the file as file input
			setFileInput(fr.result);
			setShowMessage(true);
			e.target.value = null;
		};

		// Reading the file.
		fr.readAsText(e.target.files[0]);
		setFileName(e.target.files[0].name);
		// console.log(e.target.files[0].name);
	};

	const handleFileDragDrop = (e) => {
		// console.log("Fichero(s) arrastrados");
		setActiveAnimationDrag(false);
		// Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
		e.preventDefault();

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
					console.log(result);
					setOutput(result);
					// Setting the content of the file as file input
					setFileInput(fr.result);
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
		verifyDoc(setResponse, setResult, output);
		setResult(true);
	};

	const handleButtonSellar = async (e) => {
		let data_raw = '{"block":{"data":"// IMPORT ';
		data_raw += "7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"; // smart contract
		data_raw += "\\n {hash:'";
		data_raw += output; //doc hash
		data_raw +=
			'\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';

		sellarDoc(setResponse, setResult, output, data_raw);
	};

	const backToInitialState = (e) => {
		setFileInput("");
		setOutput("");
		setResponse({});
		setResult(false);
		setShowMessage(false);
		navigate("/");
	};
	// console.log(showResponse);
	return (
		<div className="container">
			<div className="container-content  ">
				{!showResult && (
					<div className="container-form-title  animate__animated animate__fadeIn">
						<form>
							<h4 className="form-heading">Sello de Tiempo</h4>
							{/* <div className="form-group">
                            <label htmlFor="text-input">Text</label>
                            <input type="text" className="form-control" id="text-input" placeholder='Write some text' value={text_input} onChange={handleTextInput} />
                        </div> */}
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
				{showMessage && !showResult && (
					<div className="hashed-output">
						<h4 className="hashed-algorithm-heading">Hash del archivo: </h4>
						<div className="hashed-algorithm-container">
							<p className="hashed-algorithm-text">{output}</p>
						</div>
						<p className="file-name">Archivo: {file_Name}</p>
					</div>
				)}
				{showMessage && !showResult && (
					<div className="hashed-button">
						<button className="verify-doc" type="button" onClick={handleButtonVerificar}>
							VERIFICAR
						</button>
						<button type="button" className="sellar-doc" onClick={handleButtonSellar}>
							SELLAR
						</button>
					</div>
				)}
				{showResult && (
					<ShowResponse showResponse={showResponse} backToInitialState={backToInitialState} />
				)}
			</div>
		</div>
	);
}
