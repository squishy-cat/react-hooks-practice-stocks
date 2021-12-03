import React from "react";
import Stock from "./Stock";

function PortfolioContainer( {stocks, handleClick} ) {
  
  function renderStocks() {
    return stocks.map ((stock)=> {
      return <Stock 
        stock={stock}
        handleClick={handleClick}
        key={stock.id}
      />
    })
  }

  return (
    <div>
      <h2>My Portfolio</h2>
      {renderStocks()}
    </div>
  );
}

export default PortfolioContainer;
