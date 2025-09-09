import React, {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {


  const [allOrders , setAllOrders] = useState([]);

  useEffect( () =>{
    axios.get("https://stck-market-clone-backend-1.onrender.com/allOrder")
    .then((res) => {
      setAllOrders(res.data);
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error(error.message);
      }
    });
  })
 
  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            
           
          </tr>

          {allOrders.map((stock , index) =>{
            
          

            return (
              <tr key={index} >
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
           
            <td>{stock.price.toFixed(2)}</td>
            
          </tr>
            )
          })}
        </table>
      </div>
       
          <br />
        <Link to={"/"} className="btn">
          Get started
        </Link>
      
    </>
  );
};

export default Orders;