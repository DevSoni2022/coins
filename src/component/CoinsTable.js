import {
  Container,
  createTheme,
  LinearProgress,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { Classnames } from "react-alice-carousel";
import { Pagination } from "@material-ui/lab";
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1)
  const { currency } = CryptoState();
  const navigate = useNavigate();

  
  const FetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    FetchCoins();
  }, [currency]);

  const darKTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const HandleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };
//   const useStyle= makeStyles(()=>({
//     row:{
//         backgroundColor:"#16171a",
//         cursor:"pointer",
//         "&:hover":{
//             backgroundColor:"#131111",
//         },
//         fontFamily:"Montserrat"
//     },
//   }))
// const classes = useStyle()
  console.log(HandleSearch(), "$%$@#%#$@%");
  return (
    <ThemeProvider theme={darKTheme}>
      <Container style={{ textAlig: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontWeight: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
        >
          Get all the info regarding your favorite Crypto Currency App
          <TextField
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ marginTop: 20, marginBottom: 20, width: "100%" }}
            label="Search for Crypto Currency..."
            variant="outlined"
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ backgroundcolor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ background: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {HandleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                    let profit = row.price_change_percentage_24h >= 0;
                    let price = row?.current_price.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})

                    return (
                      <TableRow
                        onClick={() => navigate(`coins/${row.id}`)}
                        key={row.name}
                        // className={classes.row}
                        style={{
                            backgroundColor:"#16171a",
        cursor:"pointer",
        "&:hover":{
            backgroundColor:"#131111",
        },
        fontFamily:"Montserrat"
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "darkgrey",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {row.symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {row.symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination 
          onChange={(_,value)=>{
            setpage(value);
            window.scroll(0,450)
          }}
          style={{
            padding:20,
            width:"100%",
            display:"flex",
            justifyContent:"center"
          }}
          count ={(HandleSearch()?.length/10).toFixed(0)}
          />
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
