import './App.css';

import { useState, useEffect } from 'react';
// Source: https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/
import { get } from 'aws-amplify/api';

import CreatedOn from './GitHubBornOn';
import LoadingText from './LoadingText';

// App component. Modified from textbook to assign my own API
const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])

  // State for input of limit and start parameters for the API request
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  const updateInputValues = (type, value) => {
    updateInput({ ...input, [type]: value });
  }

  // Define function to all API
  // TODO make notes about changes to this function :)
  const fetchCoins = async() => {
    const { limit, start } = input;
    const restOperation = await get({
      apiName: 'coinapi',
      path: `/coins?limit=${limit}&start=${start}`
    })
    const { body } = await restOperation.response;
    const json = await body.json();
    updateCoins(json.coins);
  }

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      <h2>Coin values</h2>
      {
        !coins.length
        ? <>
            <LoadingText/>
            <br/>
          </>
        :
      <ul>
      {
        coins.map((coin, index) => (
          <li key={index}>
            <strong>{coin.name} - {coin.symbol}</strong>:
            <span>${coin.price_usd}</span>
          </li>
        ))
      }
      </ul>
      }
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder='limit'
      />
      <input
        onChange={e => updateInputValues('start', e.target.value)}
        placeholder='start'
      />
      <button 
        onClick={fetchCoins} 
      >
        Fetch Coins
      </button>
      <h2>GitHub account creation date</h2>
      <CreatedOn/>
    </div>
  );
}

export default App;
