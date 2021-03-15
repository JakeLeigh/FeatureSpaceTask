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
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default App;
