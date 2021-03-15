import React, {useState} from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const callApi = (e) => {
    e.preventDefault();
    console.log(searchTerm);
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
        </div>
      </div>
    </div>
  );
}

export default App;
