import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import { useHistory, Link, Route, BrowserRouter as Router} from 'react-router-dom';
import Postcode from './components/Postcode';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const test = () => {
    if(searchTerm == ''){
      setErrorMessage('Please enter a postcode and make sure it is valid');
    }
  }
  return (
    <Router>
    <div className="App">
      <div className='container'>
        <div className='form comp'>
          <h3>Enter Postcode</h3>
          <form className="was-validated" data-toggle="validator">
            <input type='text' placeholder='CB4 0GF' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required="required"/>
              <div className="error">{errorMessage}</div>
            <Link to={`/${searchTerm}`} onClick={test} className="btn btn-primary btn-sm submitButton">Submit</Link>
          </form>
        </div>
        <div>
          <Route path='/:postcode' render={(props) => <Postcode {...props} errorMessage={setErrorMessage} />}/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
