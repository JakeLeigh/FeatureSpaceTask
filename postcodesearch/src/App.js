//import react and usestate libraries
import React, {useState} from 'react';
//import css file
import './App.css';
//import packages from react-router-dom in order to create successful routes and components
import {Link, Route, BrowserRouter as Router} from 'react-router-dom';
//import postcode component
import Postcode from './components/Postcode';

function App() {
  //define inital state props for search term and error message
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //method to check whether search term value is empty when button clicked, if so then update error message to inform user to enter a postcode and make sure it is valid
  const checkSearchTerm = () => {
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
            {/* create text input where value is set to searchTerm state value and onchange can update value of searchterm using e.target.value*/}
            <input type='text' placeholder='CB4 0GF' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} required="required"/>
            {/* div to hold error message*/}
              <div className="error">{errorMessage}</div>
              {/*Link component that redirects to /postcode and performs the onclick check to see if the searchterm value is empty or not */}
            <Link to={`/${searchTerm}`} onClick={checkSearchTerm} className="btn btn-primary btn-sm submitButton">Submit</Link>
          </form>
        </div>
        <div>
          {/* Define a component route that renders the Postcode comp which is passed props, and the setErrormessage usestate value in order to update the error message in the component itself*/}
          {/* :postcode is a wildcard to say any value after the initial /... should redirect to postcode comp*/}
          <Route path='/:postcode' render={(props) => <Postcode {...props} errorMessage={setErrorMessage} />}/>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
