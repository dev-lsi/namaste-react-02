import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./assets/logo.png";
import { useEffect, useState } from "react";
import { restaurantsURL, restaurantsURL2 } from "./utils/paths.js";
//import {restaurantsDataPath} from "./utils/paths.js";

const Header = () => {
  return (
    <div className="header">
      <div>
        <img className="logo" src={logo} alt="image"></img>
      </div>
      <div>
        <ul className="nav-ul">
          <li className="nav-ul-li">Home</li>
          <li className="nav-ul-li">About</li>
          <li className="nav-ul-li">Contact</li>
        </ul>
      </div>
      <div>
        <button className="login-btn">Login</button>
      </div>
    </div>
  );
};

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentOffset, setCurrentOffset] = useState("");
  const [nextOffset2, setNextOffset] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log(restaurantsURL);
      const response = await fetch(restaurantsURL);
      const rowData = await response.json();
      const restaurantsFetched = await rowData.data.cards[4].card.card
        .gridElements.infoWithStyle.restaurants;
      console.log(restaurantsFetched);
      setRestaurants(restaurantsFetched);
      const fetchedOffset = rowData.data.pageOffset.nextOffset;
      setNextOffset(fetchedOffset);
      console.log(nextOffset2);
    }

    fetchData(restaurants);
  }, []);

  let payload = {
    widgetOffset: {
      NewListingView_category_bar_chicletranking_TwoRows: "",
      NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
      Restaurant_Group_WebView_SEO_PB_Theme: "",
      collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "26",
      inlineFacetFilter: "",
      restaurantCountWidget: "",
    },
    nextOffset: nextOffset2,
  };

  async function getPageData() {
    const response = await fetch(restaurantsURL2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
  }



  return (
    <div>
      <div className="serch-container">Search</div>
      <div className="res-container">
        <button onClick={() => getPageData()}>Load More</button>

        {restaurants.map((r) => (
          <RestaurantCard
            key={r?.info?.id}
            name={r?.info?.name}
            imageId={r?.info?.cloudinaryImageId}
          />
        ))}
      </div>
    </div>
  );
};

const RestaurantCard = ({ name, imageId }) => {
  return (
    <div className="restaurant-card">
      <img
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          imageId
        }
        alt="Image"
      ></img>
      <h2>{name}</h2>
      <h3>Quisines</h3>
      <h3>Raiting Stars</h3>
    </div>
  );
};

const App = () => {
  return (
    <div id="app">
      <Header />
      <Body />
    </div>
  );
};

const appRoot = ReactDOM.createRoot(document.getElementById("root"));
appRoot.render(<App />);
