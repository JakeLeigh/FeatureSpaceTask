import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({});
  const [nearestResults, setNearestResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const callApi = (e) => {
    e.preventDefault();
    if(searchTerm.match('^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$') != null){
      setErrorMessage('');
      axios.get(`http://api.postcodes.io/postcodes/${searchTerm}`)
      .then(res => {
        setResults(res.data.result);
      })
      .catch(err => {
        setErrorMessage('There has been an internal server error, please try again later');
      })

      axios.get(`http://api.postcodes.io/postcodes/${searchTerm}/nearest`)
      .then(res => {
       setNearestResults(res.data.result);
      })
      .catch(err => {
        setErrorMessage('There has been an internal server error, please try again later');
      })
    }
    else {
     setErrorMessage('Please Please enter a postcode and make sure it is valid');
    }
  }
  return (
    <div className="App">
      <div className='container'>
        <div className='form comp'>
          <h3>Enter Postcode</h3>
          <form className="was-validated" data-toggle="validator">
            <input type='text' placeholder='CB4 0GF' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required="required"/>
              <div className="error">{errorMessage}</div>
            <button type="submit" className="btn btn-primary btn-sm submitButton" onClick={callApi}>Submit</button>
          </form>
          <div className='resultsDiv'>
            <h5>Country: <span className='resultValue'>{results.country}</span></h5>
            <h5>Region: <span className='resultValue'>{results.region}</span></h5>
          </div>
        </div>
        <div className='comp relatedPostcodes'>
          <h3>Nearest Postcodes</h3>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Postcode</th>
              <th scope="col">Country</th>
              <th scope="col">Region</th>
            </tr>
          </thead>
          <tbody>
            {nearestResults.map((result, i) => {
              return (
                <tr key={i}>
                <th scope="row">{result.postcode}</th>
                <td>{result.country}</td>
                <td>{result.region}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default App;
