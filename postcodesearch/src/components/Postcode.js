import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';

function Postcode(props){
  const postcode = props.match.params.postcode;
  const [results, setResults] = useState({});
  const [nearestResults, setNearestResults] = useState([]);

  useEffect(() => {
    if(postcode.match('^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$') != null){
      props.errorMessage('');
      axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
      .then(res => {
        setResults(res.data.result);
      })
      .catch(err => {
        props.errorMessage('There has been an internal server error, please try again later');
      })
      
      axios.get(`http://api.postcodes.io/postcodes/${postcode}/nearest`)
      .then(res => {
       setNearestResults(res.data.result);
      })
      .catch(err => {
        props.errorMessage('There has been an internal server error, please try again later');
      })
    }
    else {
      props.errorMessage('Please enter a postcode and make sure it is valid');
    }
  }, [postcode]);
    return (
      <div>
          <div className='resultsDiv'>
            <h5>Country: <span className='resultValue'>{results.country}</span></h5>
            <h5>Region: <span className='resultValue'>{results.region}</span></h5>
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
    )
}

export default Postcode;