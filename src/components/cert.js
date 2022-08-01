import React, { useState } from "react";
import { sha256 } from "crypto-hash";
import validator from "validator";
import Spinner from "./Spinner";

export default function CertForm() {
	const [emailError, setEmailError] = useState("Ingrese un Email");
	const [emailOk, setEmailOk] = useState(false);
	const [emailDir, setEmailDir] = useState("");
	let [file_input, setFileInput] = useState("");
	let [output, setOutput] = useState("");
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

	function format_time(s) {
		const dtFormat = new Intl.DateTimeFormat("es-AR", {
			timeStyle: "long",
			timeZone: "America/Argentina/Buenos_Aires",
		});

		return dtFormat.format(new Date(s * 1e3));
	}

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
		// Initializing the file reader
		const fr = new FileReader();

		// Listening to when the file has been read.
		fr.onload = async () => {
			let result = "";

			// Hashing the content based on the active algorithm

			result = await sha256(fr.result);

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
		console.log(e.target.files[0].name);
	};

	const handleFileDragDrop = (e) => {
		console.log("Fichero(s) arrastrados");
		setActiveAnimationDrag(false);

		// Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
		e.preventDefault();

		if (e.dataTransfer.files) {
			// Usar la interfaz DataTransferItemList para acceder a el/los archivos)
			for (var i = 0; i < e.dataTransfer.files.length; i++) {
				var file = e.dataTransfer.files[i];
				console.log("... file[" + i + "].name = " + file.name);
				setFileName(file.name);

				const fr = new FileReader();
				fr.readAsText(e.dataTransfer.files[i]);

				fr.onload = async () => {
					let result = "";
					result = await sha256(fr.result);
					// Setting the hashed text as the output
					setOutput(result);
					// Setting the content of the file as file input
					setFileInput(fr.result);
				};
				setShowMessage(true);
			}
		} else {
			// Usar la interfaz DataTransfer para acceder a el/los archivos
			for (var i = 0; i < e.dataTransfer.files.length; i++) {
				console.log("... file[" + i + "].name = " + e.dataTransfer.files[i].name);
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
		let endpoint =
			"https://development-001-node.test.nxtfi.net/7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99/_/";
		endpoint += output;
		fetch(endpoint)
			// Exito
			.then((response) => response.json())
			.then((json) => {
				if (json != null) {
					console.log("Bloque: ", json);
					// setResponse("Documento sellado en el bloque: " + json);
					//obtener timestamp
					//https://development-001-node.test.nxtfi.net/_block
					let blockReadEndpoint = "https://development-001-node.test.nxtfi.net/_block/";
					blockReadEndpoint += json;
					fetch(blockReadEndpoint)
						// Exito
						.then((response) => response.json())
						.then((blockData) => {
							console.log("Bloque sellador: ", blockData);
							setResponse({
								msg: "Documento sellado",
								data: {
									hash: blockData.hash,
									timestamp: blockData.timestamp,
									date: new Date(blockData.timestamp).toLocaleString(
										"es-AR",
										"America/Argentina/Buenos_Aires"
									),
								},
								sellado: true,
								loading: true,
							});
						})
						.catch((err) => {
							console.log("timestamp fail", err);
							setResponse({
								msg: "Lo sentimos ha ocurrido un error",
								data: [],
								loading: true,
								sellado: false,
							});
						});
					setResult(true);
				} else {
					console.log("Documento no sellado");
					setResponse({ msg: "Documento no sellado", data: {hash:""}, sellado: false, loading: true });
				}
			}) //imprimir los datos en la consola
			.catch((err) => {
				console.log("Solicitud fallida", err);
				setResponse({ msg: "Sin Resultado", data: {}, loading: true, sellado: false });
			}); // Capturar errores
		setResult(true);
	};

	const handleButtonSellar = async (e) => {
		let endpoint =
			"https://development-001-node.test.nxtfi.net/7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99/_/";
		endpoint += output;
		fetch(endpoint)
			// Exito
			.then((response) => response.json())
			.then(async (json) => {
				if (json != null) {
					console.log("Bloque: ", json);
					// setResponse("Documento ya se encuentra sellado en el bloque: " + json);
					setResponse({
						msg: "Documento ya se encuentra sellado ",
						data: { hash: json },
						sellado: true,
						loading: true,
					});
				} else {
					console.log("Documento no sellado");
					//sellar
					console.log("sellando...");
					let data_raw = "{";
					data_raw += '"mail":"';
					data_raw += emailDir;
					data_raw += '",';
					data_raw += '"block":{"data":"// IMPORT ';
					data_raw += "7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"; // smart contract
					data_raw += "\\n {hash:'";
					data_raw += output; //doc hash
					data_raw +=
						'\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';

					// string pattern
					//let data = '{"block":{"data":"// IMPORT 7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99\\n {hash:\'1355d4c778090809336ce9d0980af78c16edf218ded10c2a7ac1736c9e8b1fff\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';

					const location = "signblock.test.nxtfi.net";
					const settings = {
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: data_raw,
					};
					try {
						setResponse({ msg: "Documento enviado a sellar", data: {hash:""}, sellado: false, loading: true });
						const fetchResponse = await fetch(`https://${location}/create`, settings);
						const data = await fetchResponse.json();
						console.log("Resultado: ", data);
						return data;
					} catch (e) {
						console.log("Error: ", e);
						setResponse({ msg: "Sin resultado", data: {}, sellado: false, loading: true });
						return e;
					}
				}
			}) //imprimir los datos en la consola
			.catch((err) => {
				console.log("Solicitud fallida", err);
				setResponse({ msg: "Sin resultado", data: {hash:""}, sellado: false, loading: true });
			}); // Capturar errores
		setResult(true);
	};

	const backToInitialState = (e) => {
		setFileInput("");
		setOutput("");
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
				{showMessage && !showResult && (
					<div className="hashed-output">
						<h4 className="hashed-algorithm-heading">Hash del archivo</h4>
						<div className="hashed-algorithm-container">
							<p className="hashed-algorithm-text">{output}</p>
						</div>
						<p className="file-name">Archivo: {file_Name}</p>
					</div>
				)}
				{showMessage && !showResult && emailOk && (
					<div className="hashed-button">
						<button className="verify-doc" type="button" onClick={handleButtonVerificar}>
							VERIFICAR
						</button>
						<button className="sellar-doc" type="button" onClick={handleButtonSellar}>
							SELLAR
						</button>
					</div>
				)}
				{showResult && (
					<div className="hashed-output-response">
						<h4 className="hashed-algorithm-heading">Respuesta de la blockchain</h4>
						<div className="hashed-algorithm-container">
							{showResponse.loading ? (
								showResponse.sellado && showResponse.data.timestamp ? (
									<div className="response-hashed-algorithm animate__animated animate__fadeIn animate__delay-8s">
										<div className="field-resp ">
											<h3 className="response-heading">Estado:</h3>
											<p>{showResponse.msg}</p>
										</div>
										<div className="field-resp ">
											<h3 className="response-heading">Hash del bloque:</h3>
											<p>{showResponse.data.hash}</p>
										</div>
										<div className="field-resp">
											<h3 className="response-heading">Timestamp:</h3>
											<p>{showResponse.data.timestamp}</p>
										</div>
										<div className="field-resp ">
											<h3 className="response-heading">Fecha y hora:</h3>
											<p>{showResponse.data.date}</p>
										</div>
									</div>
								) : (
									<div className="res-msg  animate__animated animate__fadeIn animate__delay-8s">
										<p className="hashed-algorithm-text">{showResponse.msg} </p>
									</div>
								)
							) : (
								<div className="spinner">
									<Spinner />
								</div>
							)}
							<button type="button" className="again-button" onClick={backToInitialState}>
								Volver a verificar/sellar
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
