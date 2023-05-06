//vefify document
export const verifyDoc = async (setResponse, setResult, output) => {
	// GET (Request).
	let endpoint =
		"https://demo-001-node.cloud.nxtfi.org/v2/088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15/_/";
	endpoint += output;

	await fetch(endpoint)
		// Exito
		.then((response) => response.json())
		.then((json) => {
			if (json != null  && json.error != "notFound") {
				// console.log("Bloque: ", json);
				// setResponse({ msg: "Documento sellado", data: { hash: json }, sellado: true });
				//obtener timestamp
				let blockReadEndpoint = "https://demo-001-node.cloud.nxtfi.org/v2/_block/";
				blockReadEndpoint += json.block;
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
								hashdoc: output,
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
			setResponse({ msg: "Sin resultado", data: {}, loading: true, sellado: false });
		}); // Capturar errores
};

export const sellarDoc = (setResponse, setResult, output, data_raw) => {
	let endpoint =
		"https://demo-001-node.cloud.nxtfi.org/v2/088cd152d9784216ad60606b0fec905788d4116b1deacd458c9e56017954ab15/_/";
	endpoint += output;
	fetch(endpoint)
		// Exito
		.then((response) => response.json())
		.then(async (json) => {
			if (json != null  && json.error != "notFound") {
				// console.log("Documento selllado en el Bloque: ", json);
				setResponse({
					msg: "Documento ya se encuentra sellado",
					data: { hash: json.hash },
					sellado: true,
					loading: true,
				});
			} else {
				const location = "signblock.dev.nxtfi.org";
				const settings = {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: data_raw,
				};
				try {
					setResponse({ msg: "", data: {}, sellado: false, loading: false });
					const fetchResponse = await fetch(`https://${location}/create`, settings);
					const data = await fetchResponse.json();
					setResponse({ msg: "Documento enviado a sellar", data: {}, sellado: false, loading: true });
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
