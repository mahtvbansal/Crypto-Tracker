import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Coin from './Coin.js'

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() =>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const handleChange = e =>{
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  console.log(filteredCoins)

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input className="coin-input" type="text" placeholder="Search" onChange={handleChange} />
        </form>
      </div>
      {
        filteredCoins.map(coin => {
        // coins.map(coin => {
          return (
            <Coin key={coin.id} name={coin.name} 
            image={coin.image} symbol={coin.symbol}
            volume={coin.total_volume} 
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap = {coin.market_cap}/>
          )
        } )
      }
    </div>
  );
}

export default App;
