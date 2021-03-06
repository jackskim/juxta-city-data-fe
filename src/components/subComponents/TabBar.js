import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: 80,
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      top: 80,
    },
  },
  Tabs: {
    background: "#2196F3",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 28,
    color: "white",
  },
}));

export default function TabBar(props) {
  const [value, setValue] = useState("Population");
  const classes = styles(); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const ele = document.getElementById(newValue);
    if (ele) {
      const offset = ele.offsetTop;
      window.scrollTo(0, offset - 190);
    }
  };
  return (
    <div className={classes.container}>
      <AppBar data-testid="appbar" position="sticky" className="classes.AppBar" color="default">
        <Tabs data-testid="tabs" className={classes.Tabs} value={value} onChange={handleChange} indicatorColor="primary" variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
          <Tab label="Population" value="Population" data-testid="population-tab" />
          <Tab label="Climate" value="Climate" data-testid="climate-tab" />
          <Tab label="Economy" value="Economy" />
          <Tab label="Cost of Living" value="Cost of Living" />
        </Tabs>
      </AppBar>
    </div>
  );
}
