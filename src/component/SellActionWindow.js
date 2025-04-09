import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import  Holdings  from "./Holdings.js";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid, availableQuantity }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleSellClick = () => {
    if (stockQuantity <= availableQuantity) {
      axios.post("http://localhost:3001/newSellOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      });

      GeneralContext.closeSellWindow();
    } else {
      alert("You do not have enough quantity to sell.");
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              max={availableQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Available Quantity: {availableQuantity}</span>
        <span>Margin required = {stockQuantity * stockPrice}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;