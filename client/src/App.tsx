import { BrowserRouter as Router } from 'react-router-dom';
import Listings from './components/Listings';

function App() {
  return (
    <>
      <header className="header h-20 flex justify-center items-center">
        <p className="text-3xl">Header</p>
      </header>
      <main className="w-11/12 mx-auto flex flex-col justify-center items-center">
        <Router>
          <Listings />
        </Router>
      </main>
      <footer className="footer h-20 flex justify-center items-center" />
    </>
  );
}

export default App;
