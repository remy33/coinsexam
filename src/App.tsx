import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import ProTip from "./ProTip";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
} from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Remy
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

function listItem(val: any, index: any) {
  return (
    <div key={index}>
      {
        <ListItem
          onClick={onClickUrl(
            `https://www.binance.com/en/trade/${val.symbol}?theme=dark`
          )}
        >
          <ListItemButton>
            <ListItemIcon>→</ListItemIcon>
            <ListItemText primary={val.symbol} />
          </ListItemButton>
        </ListItem>
      }
    </div>
  );
}

let allCoins: any[] = [];
let pagingCount: number = 0;
export default function App() {
  const coinsArray: any[] = [];
  const [coins, setCoins] = useState(coinsArray);
  const [pageCount, setPage] = useState(pagingCount);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://192.168.100.200:1880/endpoint/coins`
        );
        const json = await response.json();
        allCoins = json;
        console.log(json);
        setCoins((prevCoins) => allCoins.slice(0, 10));
        setPage(() => Math.ceil(allCoins.length / 10));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  function pageChange(event: React.ChangeEvent<unknown>, page: number) {
    page -= 1;
    setCoins((prevCoins) => allCoins.slice(page * 10, page * 10 + 10));
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Coins DB ripoff
        </Typography>
        <List>{coins.map((val, index) => listItem(val, index))}</List>
        <Pagination onChange={pageChange} count={pageCount} />
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const onClickUrl =
  (url: string): (() => void) =>
  () =>
    openInNewTab(url);
