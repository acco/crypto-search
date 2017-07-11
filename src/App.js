import React, { Component } from "react";
import "./App.css";
import loadingRing from "./loading-ring.svg";

import LovableFilterableTable from "./LovableFilterableTable";

export const tableSchema = {
  name: "Name",
  symbol: "Symbol",
  price_usd: "Price ($)",
  percent_change_1h: "% Change (1h)",
  percent_change_24h: "% Change (24h)",
  percent_change_7d: "% Change (7d)"
};

const API_URL = "https://api.coinmarketcap.com/v1/ticker/?limit=100";

const parseJSON = resp => resp.json();

// const extractCoinData = json => json.Data;

// const byNameToArray = byName => {
//   return Object.keys(byName).reduce((memo, name) => {
//     memo.push(byName[name]);
//     return memo;
//   }, []);
// };

// const top100BySortOrder = coins => {
//   return coins
//     .sort((a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10))
//     .slice(0, 99);
// };

// const snakeCaseKeys = array => {
//   return array.map(o => {
//     return Object.keys(o).reduce((memo, key) => {
//       const newKey = key.replace(/^(\w)/, match => match.toLowerCase());
//       memo[newKey] = o[key];
//       return memo;
//     }, {});
//   });
// };

const ContentWithLoadingIndicator = ({ loaded, children }) => {
  if (loaded) {
    return children;
  } else {
    return (
      <div className="loading-ring">
        <img src={loadingRing} />
      </div>
    );
  }
};

class App extends Component {
  state = {
    coins: [],
    loves: [],
    loaded: false
  };

  handleHeartClick = id => {
    this.setState(prevState => {
      const prevLoves = prevState.loves;
      if (prevLoves.find(i => i === id)) {
        return {
          loves: prevLoves.filter(i => i !== id)
        };
      } else {
        return {
          loves: prevLoves.concat(id)
        };
      }
    });
  };

  fetchCoins = () => {
    fetch(API_URL).then(parseJSON).then(top100 =>
      this.setState({
        coins: top100,
        loaded: true
      })
    );
  };

  componentDidMount() {
    this.fetchCoins();
    setInterval(this.fetchCoins, 10000);
  }

  render() {
    const { loves, loaded } = this.state;

    const coins = this.state.coins.map(coin => ({
      ...coin,
      isLoved: loves.find(id => id === coin.id)
    }));

    return (
      <div className="container">
        <div className="CryptoTable">
          <ContentWithLoadingIndicator loaded={loaded}>
            <LovableFilterableTable
              schema={tableSchema}
              items={coins}
              onHeartClick={this.handleHeartClick}
            />
          </ContentWithLoadingIndicator>
        </div>
      </div>
    );
  }
}

export default App;

// const localStorageKey = "crypto-search:loves";

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       coins: [],
//       loves: [],
//       loaded: false
//     };

//     if (window && window.localStorage) {
//       const stored = window.localStorage.getItem(localStorageKey);
//       if (stored) {
//         this.state.loves = JSON.parse(stored);
//       }
//     }
//   }

//   storeLoveInLocalStorage(id) {
//     if (window && window.localStorage) {
//       let json = [];

//       const stored = window.localStorage.getItem(localStorageKey);
//       if (stored) {
//         json = JSON.parse(stored);
//       }

//       json.push(id);
//       window.localStorage.setItem(localStorageKey, JSON.stringify(json));
//     }
//   }

//   handleHeartClick = id => {
//     this.setState(prevState => {
//       const prevLoves = prevState.loves;
//       if (prevLoves.find(i => i === id)) {
//         return {
//           loves: prevLoves.filter(i => i !== id)
//         };
//       } else {
//         return {
//           loves: prevLoves.concat(id)
//         };
//       }
//     });
//   };

//   fetchCoins = () => {
//     fetch(API_URL).then(parseJSON).then(top100 =>
//       this.setState({
//         coins: top100,
//         loaded: true
//       })
//     );
//   };

//   componentDidMount() {
//     this.fetchCoins();
//     setInterval(this.fetchCoins, 10000);
//   }

//   render() {
//     const { loves, loaded } = this.state;

//     const coins = this.state.coins.map(coin => ({
//       ...coin,
//       isLoved: loves.find(id => id === coin.id)
//     }));

//     return (
//       <div className="container">
//         <div className="CryptoTable">
//           <ContentWithLoadingIndicator loaded={loaded}>
//             <LovableFilterableTable
//               schema={tableSchema}
//               items={coins}
//               onHeartClick={this.handleHeartClick}
//             />
//           </ContentWithLoadingIndicator>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
