import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Box from "@material-ui/core/Box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState('')

  return (
    <div className={classes.root}>
      <Router>
        <Menu 
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer}></div>
            <Switch>
              <Route exact path={["/", "/dashboard"]}>
                <Dashboard 
                  setSelectedItem={setSelectedItem}
                />
              </Route>
              <Route path="/products">
                <Products setSelectedItem={setSelectedItem} />
              </Route>
              <Route path="/customers">Customers</Route>
            </Switch>
            <Box pt={5}>
              <Footer />
            </Box>
        </main>
      </Router>
    </div>
  );
}

export default App;
