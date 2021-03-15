import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({});

  const callApi = (e) => {
    e.preventDefault();
    axios.get(`http://api.postcodes.io/postcodes/${searchTerm}`)
      .then(res => {
        console.log(res);
        setResults(res.data.result);
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div className="App">
      <div className='container'>
        <div className='titleDiv'>
          <h1>Welcome to Postcode Searcher</h1>
        </div>
        <div className='form'>
          <form>
            <input type='text' placeholder='Enter Postcode' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button type="submit" className="btn btn-primary" onClick={callApi}>Submit</button>
          </form>
          <div className='resultsDiv'>
            <h5>Country: <span id='country'>{results.country}</span></h5>
            <h5>Region: <span id='region'>{results.region}</span></h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
