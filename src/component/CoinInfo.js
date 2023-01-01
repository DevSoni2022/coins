import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../Config/api";
import { ThemeProvider,createTheme, CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const CoinInfo = ({coin}) => {
    const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setflag] = useState(false);

 
  const fetchHistoricData = async () => {
    debugger
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
    setflag(false);

  };

  console.log(historicData,"History");

  useEffect(() => {
    if(days && currency && coin && coin.id){
        fetchHistoricData();

    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
<ThemeProvider theme={darkTheme}>
<div>
    {!historicData ? <CircularProgress 
    style={{color:"gold"}}
    size={250}
    thickness={1}
    />:<>
    {/* <Line 
        data={{
        lables:historicData && historicData.map(coin=>{
        let date = new Date(coin[0])
        let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();

        }),
        datasets: [
            {
              data: historicData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        
    }}
    /> */}
    </>}
        {/* Buttons */}

</div>
</ThemeProvider>
    )
}

export default CoinInfo