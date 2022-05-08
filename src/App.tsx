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
        <ListItem>
          <ListItemButton>
            <ListItemIcon>→</ListItemIcon>
            <ListItemText primary={val.symbol} />
          </ListItemButton>
        </ListItem>
      }
    </div>
  );
}

export default function App() {
  let allCoins: any[] = [];
  const coinsArray: any[] = [];
  const [coins, setCoins] = useState(coinsArray);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://192.168.100.200:1880/endpoint/coins`
        );
        const json = await response.json();
        allCoins = json;
        setCoins((prevCoins) => allCoins.slice(0, 10));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Coins DB ripoff
        </Typography>
        <List>{coins.map((val, index) => listItem(val, index))}</List>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
