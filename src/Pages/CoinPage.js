// import { makeStyles } from "@material-ui/core";
import axios from "axios";
// import { makeStyles } from "@mui/styles";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../component/CoinInfo";
import { Typography } from "@material-ui/core";
import ReactHtmlParse from "react-html-parser";
const CoinPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const FetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    if (id && id.length > 0) {
      FetchSingleCoin();
    }
  }, []);

  // const useStyles = makeStyles((theme) => ({
  //    container:{
  //     display:"flex",
  //     [theme.breakpoints.down("md")]:{
  //       flexDirection:"column",
  //       alignItems:"center",
  //     }
  //    },
  //    sideBar:{
  //     width:'30%',
  //     [theme.breakpoints.down('md')]:{
  //       width:"100%",
  //     },
  //     display:"flex",
  //     flexDirection:"column",
  //     alignItems:"center",
  //     marginTop:25,
  //     borderRight:"2px solid grey"
  //    },

  // }));
  // const classes = useStyles();
  let discritpion = coin && coin.description && coin.description.en;
  let marketCap =
    coin &&
    coin.market_data &&
    coin.market_data.market_cap &&
    coin.market_data.market_cap[
      currency.toLowerCase("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    ];
  let price =
    coin &&
    coin.market_data &&
    coin.market_data.current_price[
      currency.toLowerCase("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    ];
  console.log(
    coin &&
      coin.market_data &&
      coin.market_data.current_price[currency.toLowerCase()],
    "singlecoins"
  );
  // let price = coin?.current_price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})

  return (
    <div>
      <div>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3">{coin?.name}</Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Mont",
          }}
        >
          {ReactHtmlParse(discritpion && discritpion.split(".")[0])}
        </Typography>
        <div>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                marginLeft: 10,
              }}
            >
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                marginLeft: 10,
                fontFamily: "Montserrat",
              }}
            >
              Current Pirce :
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol} {price}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
           
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                margin: 10,
              }}
            >
              MarketCap:
            </Typography>
            &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {marketCap}
            </Typography>
          </span>
        </div>
      </div>
      <div
        style={{
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Montserrat",
          color: "#fff",
        }}
      >
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
