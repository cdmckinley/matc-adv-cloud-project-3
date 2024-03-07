import './App.css';

import CreatedOn from './GitHubBornOn';
import CoinValue from './CoinValue';

const App = () => (
  <div className="App">
    <h2>Coin values</h2>
    <CoinValue/>
    <h2>GitHub account creation date</h2>
    <CreatedOn/>
  </div>
);

export default App;
