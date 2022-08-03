//vefify document
export const verifyDoc = async (setResponse, setResult, output) => {
	// GET (Request).
	let endpoint =
		"https://development-001-node.test.nxtfi.net/7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99/_/";
	endpoint += output;
	await fetch(endpoint)
		// Exito
		.then((response) => response.json())
		.then((json) => {
			if (json != null) {
				// console.log("Bloque: ", json);
				// setResponse({ msg: "Documento sellado", data: { hash: json }, sellado: true });
				//obtener timestamp
				//https://development-001-node.test.nxtfi.net/_block
				let blockReadEndpoint = "https://development-001-node.test.nxtfi.net/_block/";
				blockReadEndpoint += json;
				fetch(blockReadEndpoint)
					// Exito
					.then((response) => response.json())
					.then((blockData) => {
						// console.log("Bloque sellador: ", blockData);
						setResponse({
							msg: "Documento sellado",
							data: {
								hash: blockData.hash,
								timestamp: blockData.timestamp,
								hashdoc:output,
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
						// console.log("timestamp fail", err);
						setResponse({
							msg: "Lo sentimos ha ocurrido un error",
							data: [],
							loading: true,
							sellado: false,
						});
					});

				setResult(true);
			} else {
				// console.log("Documento no sellado");
				setResponse({ msg: "Documento no sellado", data: {}, sellado: false, loading: true });
			}
		}) //imprimir los datos en la consola
		.catch((err) => {
			// console.log("Solicitud fallida", err);
			setResponse({ msg: "Sin Resultado", data: {}, loading: true, sellado: false });
		}); // Capturar errores
};

export const sellarDoc = (setResponse, setResult, output, data_raw) => {
	let endpoint =
		"https://development-001-node.test.nxtfi.net/7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99/_/";
	endpoint += output;
	fetch(endpoint)
		// Exito
		.then((response) => response.json())
		.then(async (json) => {
			if (json != null) {
				// console.log("Documento selllado en el Bloque: ", json);
				setResponse({
					msg: "Documento ya se encuentra sellado",
					data: { hash: json },
					sellado: true,
					loading: true,
				});
			} else {
				// string pattern
				//here was data_raw declaration
				//let data = '{"block":{"data":"// IMPORT 7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99\\n {hash:\'1355d4c778090809336ce9d0980af78c16edf218ded10c2a7ac1736c9e8b1fff\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';

				const location = "signblock.test.nxtfi.net";
				const settings = {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: data_raw,
				};
				try {
					setResponse({ msg: "Documento enviado a sellar", data: {}, sellado: false, loading: true });
					const fetchResponse = await fetch(`https://${location}/create`, settings);
					const data = await fetchResponse.json();
					// console.log("Resultado: ", data);
					return data;
				} catch (e) {
					// console.log("Error: ", e);
					setResponse({ msg: "Sin resultado", data: {}, sellado: false, loading: true });
					return e;
				}
			}
		}) //imprimir los datos en la consola
		.catch((err) => {
			// console.log("Solicitud fallida", err);
			setResponse({ msg: "Sin resultado", data: {}, sellado: false, loading: true });
		}); // Capturar errores
	setResult(true);
};
