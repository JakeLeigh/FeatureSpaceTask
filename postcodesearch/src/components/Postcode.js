//import react, usestate and useeffect packages from react
import React, {useState, useEffect} from 'react';
//import css file
import '../App.css';
//import axios lib
import axios from 'axios';

function Postcode(props){
  //using the props value that was passed through by Route, create a const var that holds the value of the url query param postcode
  const postcode = props.match.params.postcode;
  //define state props for results and nearest results
  const [results, setResults] = useState({});
  const [nearestResults, setNearestResults] = useState([]);

  //useeffect method gets called once the component renders, I have also attached the postcode const to this method which means useEffect will watch that var and if the value changes, it will run the method again
  useEffect(() => {
    //if the postcode value matches the government provided regex formula for UK postcodes, then call apis
    if(postcode.match('^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$') != null){
      //reset the error message to an empty string in order to hide it
      props.errorMessage('');
      //axios get request using string interpolation to append the postcode value to the url
      axios.get(`http://api.postcodes.io/postcodes/${postcode}`)
      .then(res => {
        //if the request was successful and we get back a response, then store the value of data.result in the results state object
        setResults(res.data.result);
      })
      .catch(err => {
        //if the api failed for any reason, then update the error message to inform the user there has been some sort of server error
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
    //watch the postcode var, if it changes then call this method again
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
            {/* map through the array list of nearest results and create a new table row for each element and output postcode, country, region*/}
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