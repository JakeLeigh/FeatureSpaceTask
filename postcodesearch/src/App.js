import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({});
  const [nearestResults, setNearestResults] = useState([]);

  const callApi = (e) => {
    e.preventDefault();
    axios.get(`http://api.postcodes.io/postcodes/${searchTerm}`)
      .then(res => {
        setResults(res.data.result);
      })
      .catch(err => {
        console.log(err)
      })

      axios.get(`http://api.postcodes.io/postcodes/${searchTerm}/nearest`)
      .then(res => {
       setNearestResults(res.data.result);
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
        <div className='form comp'>
          <h3>Enter Postcode</h3>
          <form>
            <input type='text' placeholder='CB4 0GF' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button type="submit" className="btn btn-primary" onClick={callApi}>Submit</button>
          </form>
          <div className='resultsDiv'>
            <h5>Country: <span id='country'>{results.country}</span></h5>
            <h5>Region: <span id='region'>{results.region}</span></h5>
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
