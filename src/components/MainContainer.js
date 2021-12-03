import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(null)

  function toPortfolio(stock) {
    const inPortfolio = portfolio.find(s => s === stock);
    if (!inPortfolio){
      setPortfolio([...portfolio, stock])
    }
  }

  function fromPortfolio(stock) {
    const updatedPortfolio = portfolio.filter(s => s !== stock)
    setPortfolio(updatedPortfolio)
  }

  function filterAndSort(){
    let stockList;
    if(sort === null){
      stockList = stocks;
    } else if (sort === "Alphabetically") {
      stockList = stocks.sort((a, b) => {
        if(a.name > b.name) {
          return 1
        } else {
          return -1
        }
      })
    } else {
      stockList = stocks.sort((a, b) => {
        if (a.price > b.price) {
          return 1
        } else {
          return -1
        }
      })
    }
    if (filter === "All"){
      return stockList;
    } else {
      return stockList.filter(stock => stock.type === filter)
    }
  }

  function onFilterChange(e) {
    setFilter(e.target.value)
  }

  function onSortChange(e) {
    setSort(e.target.value)
  }

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then ((response) => response.json())
    .then ((data) => {
      setStocks(data)
    })
  }, []);

  return (
    <div>
      <SearchBar 
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks = {filterAndSort()}
            handleClick = {toPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks = {portfolio}
            handleClick = {fromPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
