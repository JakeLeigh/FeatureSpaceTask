//import Raect library and useState to handle state properties
import React, {useState} from 'react';
//import axios library
import axios from 'axios';
//import style sheet for app comp
import './App.css';

function App() {
  //define state and setstate properties for the search term, general result, nearest result list, and the error message
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({});
  const [nearestResults, setNearestResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  //function that is called when submit button clicked
  const callApi = (e) => {
    //stop page from refreshing by default when button is clicked
    e.preventDefault();
    //if the search term state prop the user enters matches the postcode regex formula provided by the government then we can call the apis
    if(searchTerm.match('^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$') != null){
      //set error message to empty string in order to hide message
      setErrorMessage('');
      //using axios.get function and string interpolation to create a url with the searchterm appended
      axios.get(`http://api.postcodes.io/postcodes/${searchTerm}`)
      .then(res => {
        //if the get request was successful and returned a response, then set the results state prop to the value of res.data.result which contains data for the postcode.
        setResults(res.data.result);
      })
      .catch(err => {
        //if the get request failed for any reason, then set the error message state prop to a string informing the user that there has been some sort of server error.
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
    //if the search term postcode does not match the regex formula then set the error message to a string informing the user that they need to enter a postcode and make sure it is valid
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
           {/* set the value of the input field to the search term state prop, and set the onchange prop to update the value of search term with whatever is entered as 'e.target.value'*/}
            <input type='text' placeholder='CB4 0GF' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required="required"/>
              <div className="error">{errorMessage}</div>
              {/*on button click call callApi method */}
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
            {/* map through the list of arrays from nearestResult state prop and create a new row and populate the postcode, region and country fields*/}
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
