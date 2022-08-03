import Hashing from './views/Hashing';
import Navbar from './components/Navbar';
import Cert from './views/Cert.js';
import Anexo from './views/Anexo.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HashDoc from './views/HashDoc';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Hashing/>} />
          <Route path="/certificado" element={<Cert/>} />
          <Route path="/anexo" element={<Anexo/>} />
          <Route path="/hash/:hashDoc" element={<HashDoc/>} />
        </Routes>
      </BrowserRouter>       
    </div>
  );
}

export default App;
