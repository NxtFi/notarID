import React,{useState} from 'react';
import {sha256} from 'crypto-hash';
import validator from 'validator'

export default function CertForm(){
  const [algorithms] = useState(['sha1','sha256','sha384','sha512']);
  let [text_input, setTextInput] =useState('');
  const [emailError, setEmailError] = useState('');
  const [emailDir, setEmailDir] = useState('');
  let [file_input, setFileInput] = useState('');
  let [algorithm, setAlgorithm] = useState('sha256');
  let [output,setOutput] = useState('');

  const [showMessage, setShowMessage] = useState(false);
  const [showResult, setResult] = useState(false);
  const [showResponse, setResponse]=useState('Sin resultado');


  function format_time(s) {
      const dtFormat = new Intl.DateTimeFormat('es-AR', {
        timeStyle: 'long',
        timeZone: 'America/Argentina/Buenos_Aires'
      });
      
      return dtFormat.format(new Date(s * 1e3));
  };

  //For handling text input
  const handleEmailInput = async (e) => {
    // Get the value
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
    setEmailDir(email);
  }

  //For handling file input
  const handleFileInput = (e) => {
      // Initializing the file reader
      const fr = new FileReader();

      // Listening to when the file has been read.
      fr.onload = async () => {

          let result = '';

          // Hashing the content based on the active algorithm
          
          result = await sha256(fr.result);

          // Setting the hashed text as the output
          setOutput(result);

          // Setting the content of the file as file input
          setFileInput(fr.result);
          setShowMessage(true);
          e.target.value = null;
      }

      // Reading the file.
      fr.readAsText(e.target.files[0]);
  }
  //For handling algorithm change
  const handleAlgorithmChange = async (e) => {
      // Get the selected algorithm
      let value = e.target.value;

      let result = '';

      // Check if we have a text input
      if (text_input) {

          // Hash the text based on the selected algorithm
          
              result = await sha256(text_input);
      }

      // Check if we have a file input
      if (file_input) {

          // Hash the file content based on the selected algorithm
          result = await sha256(file_input);
      }

      // Set the selected algorithm
      setAlgorithm(value);

      // Set the hashed text
      setOutput(result);

  }

  const handleFileDragDrop = (e) => {
      console.log('Fichero(s) arrastrados');

      // Evitar el comportamiendo por defecto (Evitar que el fichero se abra/ejecute)
      e.preventDefault();

      if (e.dataTransfer.files) {
          // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
          for (var i = 0; i < e.dataTransfer.files.length; i++) {
                     
              var file = e.dataTransfer.files[i];
              console.log('... file[' + i + '].name = ' + file.name);
              
              const fr = new FileReader();
              fr.readAsText(e.dataTransfer.files[i]);

              fr.onload = async () => {

                  let result = '';
                  result = await sha256(fr.result);
                  // Setting the hashed text as the output
                  setOutput(result);
                  // Setting the content of the file as file input
                  setFileInput(fr.result);
              }
              setShowMessage(true);          
          }
      } else {
          // Usar la interfaz DataTransfer para acceder a el/los archivos
          for (var i = 0; i < e.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          }
      }        
  }

  const handleFileDragOver = (e) => {
      //console.log('File(s) in drop zone');
      // Prevent default behavior (Prevent file from being opened)
      e.preventDefault();
  }

  const handleButtonVerificar = (e) => {
      // GET (Request).
      let endpoint = 'https://development-001-node.test.nxtfi.net/7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99/_/';
      endpoint += output;
      fetch(endpoint)
      // Exito
      .then(response => response.json())
      .then(json => {
          if (json!=null){
              console.log('Bloque: ', json);
              setResponse('Documento sellado en el bloque: '+ json);
              //obtener timestamp
              //https://development-001-node.test.nxtfi.net/_block
              let blockReadEndpoint = 'https://development-001-node.test.nxtfi.net/_block/';
              blockReadEndpoint += json;
              fetch(blockReadEndpoint)
                  // Exito
                  .then(response => response.json())
                  .then(blockData => {
                      console.log('Bloque sellador: ', blockData);
                      setResponse('Documento sellado en el bloque: '+ blockData.hash + '\nTimestamp: '+blockData.timestamp + '\nFecha y hora: '+(new Date(blockData.timestamp)).toLocaleString("es-AR", "America/Argentina/Buenos_Aires"));
                  })
                  .catch(err => console.log('timestamp fail', err));
                  setResult(true);
              
          } else{
              console.log('Documento no sellado');
              setResponse('Documento no sellado');
          }
      
      })    //imprimir los datos en la consola
      .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
      setResult(true);
  }
  
  const handleButtonSellar = async (e) => {

      let endpoint = 'https://development-001-node.test.nxtfi.net/7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99/_/';
      endpoint += output;
      fetch(endpoint)
      // Exito
      .then(response => response.json())
      .then(async json => {
          if (json!=null){
              console.log('Bloque: ', json);
              setResponse('Documento ya se encuentra sellado en el bloque: '+ json);
          } else{
              console.log('Documento no sellado');
              //sellar
              console.log('sellando...');
              let data_raw = '{"block":{"data":"// IMPORT ';
              data_raw += '7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99'; // smart contract
              data_raw += '\\n {hash:\'';
              data_raw += output; //doc hash
              data_raw += '\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';

              // string pattern
              //let data = '{"block":{"data":"// IMPORT 7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99\\n {hash:\'1355d4c778090809336ce9d0980af78c16edf218ded10c2a7ac1736c9e8b1fff\'}","by":"NOTARIO","scope":"7489cf6d4c588125eb62e1fff365d4ec8c00e1ebd61bd67f158efe8916765f99"}}';

              const location = 'signblock.test.nxtfi.net';
              const settings = {
                  method: 'POST',
                  headers: {"Content-type": "application/json"},
                  body: data_raw
              };
              try {
                  setResponse('Documento enviado a sellar');
                  const fetchResponse = await fetch(`https://${location}/create`, settings);
                  const data = await fetchResponse.json();
                  console.log('Resultado: ', data);
                  return data;
              } catch (e) {
                  console.log('Error: ',  e);
                  return e;
              }    
          }
      
      })    //imprimir los datos en la consola
      .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
      setResult(true);     
      } 

  const backToInitialState = (e) =>{
      setFileInput('');
      setOutput('');
      setResponse('');
      setResult(false);
      setShowMessage(false);
  }

  return (  
      <div className='hashing-container'>
          <div className='hashing-content'>
              {!showResult &&
              <div className="hashing-form">
                  <h4 className="hashing-form-heading">Sello con certificado</h4>
                  <form>
                      <div className="form-group">
                          <label htmlFor="text-input">E-mail</label>
                          <input type="email" className="form-control" id="email-input" placeholder='usuario@mail.com' value={emailDir} onChange={handleEmailInput} />
                          <p id="demo"><span style={{fontWeight: 'bold', color: 'red',}}>{emailError}</span></p>
                      </div>
                      <div className="file-drag-drop" onDrop={handleFileDragDrop} onDragOver={handleFileDragOver}>
                          <p>Arrastre y suelte el documento ...</p>
                      </div>
                      <div>
                          <label htmlFor="file-input" className='custom-file-upload'>Selecciona archivo</label>
                          <input type="file" className="form-control" id="file-input" onChange={handleFileInput} />
                      </div>
                  </form>
              </div>
              }
              {showMessage && !showResult &&
              <div className="hashed-output">
                  <h4 className="hashed-algorithm-heading">Hash del archivo</h4>
                  <div className="hashed-algorithm-container">
                      <p className="hashed-algorithm-text">
                          {output}
                      </p>
                  </div>
              </div>
              }
              {showMessage && !showResult &&
              <div className="hashed-button">              
                  <button className="space" type="button" onClick={handleButtonVerificar}>VERIFICAR</button>
                  <button type="button" onClick={handleButtonSellar}>SELLAR</button>
              </div>
              }
              {showResult &&
              <div className="hashed-output">
                  <h4 className="hashed-algorithm-heading">Respuesta de la blockchain</h4>
                  <div className="hashed-algorithm-container">
                      <p className="hashed-algorithm-text">
                          {showResponse}
                      </p>
                      <button type="button" onClick={backToInitialState}>Volver a verificar/sellar</button>
                  </div>
              </div>
              }                
          </div>           
      </div>
  );
}
