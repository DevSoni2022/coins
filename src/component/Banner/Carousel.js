import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../Config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  
carouselItem:{
    display:'flex',
    flexDirection:"column",
    alignItems:"center",
    cursor:"pointer",
    textTransform:"uppercase",
    color:"white"
}
}));


const Carousel = () => {
  const [trending, settrending] = useState([]);
  const classes = useStyle();
  const { currency,symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    settrending(data);
  };

  console.log(trending, "##@$#@!");
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit= coin.price_change_percentage_24h >=0;
    let price = coin?.current_price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})
    return (
      <Link to={`/coin/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80px"
          style={{ marginBottom: 10 }}
        />
        <span>{coin?.symbol}
        &nbsp;
        <span 
        style={{
            color:profit>0 ? "rgb(14,203,129)":"red",
            fontWeight:500,
        }}
        >
            {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
        </span>
        <span style={{fontSize:22,fontWeight:500}}>
        {symbol}{price }
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
