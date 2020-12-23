import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { 
  Link as RouterLink,
} from "react-router-dom";

const ListItemLink = (props) => {
  const { to, primary, icon, setSelectedItem, selectedItem } = props;

  return (
    <li>
      <ListItem 
        component={RouterLink} 
        button 
        onClick={() => setSelectedItem(primary)}
        to={to}
        selected={primary===selectedItem}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

export const MainListItem = (props) => {
  const { selectedItem, setSelectedItem } = props;
  return (
    <div>
        <ListItemLink
          to="/dashboard"
          primary="Dashboard"
          icon={<DashboardIcon />}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <ListItemLink
          to="/products"
          primary="Products"
          icon={<LocalMallIcon />}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <ListItemLink
          to="/orders"
          primary="Orders"
          icon={<ShoppingCartIcon />}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
        <ListItemLink
          to="/customers"
          primary="Customers"
          icon={<PeopleIcon />}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
    </div>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved Reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current Month" />
    </ListItem>
  </div>
);
