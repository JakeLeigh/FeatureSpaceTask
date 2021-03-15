import React, {useState} from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="App">
      <div className='container'>
        <div className='titleDiv'>
          <h1>Welcome to Postcode Searcher</h1>
        </div>
        <div className='form'>
          <form>
            <input type='text' placeholder='Enter Postcode' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
