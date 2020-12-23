import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton, makeStyles } from "@material-ui/core";
import productService from "../services/products";
import Button from "@material-ui/core/Button";
import Product from "./Product";
import {
  Link as RouterLink,
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import ConfirmationDialog from "./ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "500px",
    width: "100%",
  },
  toolbar: {
    display: "flex",
    padding: theme.spacing(1),
    justifyContent: "space-between",
  },
}));

const ProductActions = (props) => {
  const { product, products, setProducts } = props;
  const [open, setOpen] = useState(false);
  let { url } = useRouteMatch();

  const handleClickDelete = () => {
    setOpen(true);
  };

  const handleDeleteProduct = (ok) => {
    setOpen(false);
    if (ok) {
      productService
        .deleteById(product.id)
        .then(() => {
          setProducts(products.filter((p) => p.id !== product.id));
        })
        .catch((error) => console.log(error.response.data.error));
    }
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton
          aria-label="edit"
          component={RouterLink}
          to={`${url}/edit/${product.id}`}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={handleClickDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        open={open}
        onClose={handleDeleteProduct}
        title={"Delete product?"}
        content={`Product ${product.SKU} ${product.title} will be removed.`}
      />
    </div>
  );
};

const BulkDelete = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickDelete = () => {
    setOpen(true);
  };

  const handleMultiDelete = (ok) => {
    setOpen(false);
    if (ok) {

    }
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickDelete}>
        Delete
      </Button>
      <ConfirmationDialog
        open={open}
        onClose={handleMultiDelete}
        title={"Delete product?"}
        content={`Product will be removed.`}
      />
    </div>
  );
};

const Products = (props) => {
  const { setSelectedItem } = props;
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [selection, setSelection] = useState([]);
  let { path, url } = useRouteMatch();

  useEffect(() => {
    setSelectedItem("Products");
    productService
      .getAll()
      .then((result) => setProducts(result))
      .catch((error) => console.log(error));
  }, [setSelectedItem]);

  const columns = [
    { field: "SKU", headerName: "SKU", width: 120 },
    { field: "title", headerName: "Product Title", width: 200 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "size", headerName: "Size", width: 90 },
    { field: "contains", headerName: "Contains", width: 160 },
    { field: "costPrice", headerName: "Cost", type: "number", width: 100 },
    { field: "sellingPrice", headerName: "Price", type: "number", width: 100 },
    { field: "updatedAt", headerName: "Updated", type: "number", width: 160 },
    { field: "id", headerName: "Product ID", width: 160, hide: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <ProductActions
          products={products}
          setProducts={setProducts}
          product={params.row}
        />
      ),
    },
  ];

  const handleBulkDelete = () => {
    if (!selection.length) return;
    productService
      .bulkDelete(selection)
      .catch(error => console.log(error.response.data))
  }

  return (
    <div className={classes.container}>
      <Switch>
        <Route exact path={path}>
          <div className={classes.toolbar}>
            <div>
              {selection.length > 0 && (
                <div>
                  <Button variant="contained" color="secondary" onClick={handleBulkDelete}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to={`${url}/edit`}
            >
              New Product
            </Button>
          </div>
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onSelectionChange={(newSelection) => {
              setSelection(newSelection.rowIds);
            }}
          />
        </Route>
        <Route exact path={[`${path}/edit`, `${path}/edit/:productId`]}>
          <Product path={path} products={products} setProducts={setProducts} />
        </Route>
      </Switch>
    </div>
  );
};

export default Products;
