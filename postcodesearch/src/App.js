import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='titleDiv'>
          <h1>Welcome to Postcode Searcher</h1>
        </div>
        <div className='form'>
          <form>
            <input type='text' placeholder='Enter Postcode' />
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
