import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productService from "../services/products";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
  btnContainer: {
    marginTop: theme.spacing(4),
    "& > button": {
      marginRight: theme.spacing(1),
    },
  },
}));

const Product = (props) => {
  const { path, products, setProducts } = props;
  const classes = useStyles();
  const initProduct = {
    SKU: "",
    title: "",
    description: "",
    size: "",
    contains: "",
    costPrice: "",
    sellingPrice: "",
  };
  const [product, setProduct] = useState(initProduct);
  let { productId } = useParams();
  let history = useHistory();

  const editMode = productId ? true : false;

  useEffect(() => {
    if (editMode) {
      productService
        .getById(productId)
        .then((result) => setProduct(result))
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  }, [editMode, productId]);

  const backToProcuts = (path) => {
    history.push(path)
  }

  const handleSaveProduct = (event) => {
    event.preventDefault();
    if (editMode) {
      productService
        .updateById(product)
        .then((result) => {
          setProducts(products.map((p) => (p.id === result.id ? result : p)));
          backToProcuts(path);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      productService
        .create(product)
        .then((result) => {
          setProducts([result, ...products]);
          backToProcuts(path);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  };

  return (
    <form onSubmit={handleSaveProduct}>
      <Container maxWidth="lg" className={classes.root}>
        <Paper elevation={0} className={classes.inputContainer}>
          <TextField
            id="SKU"
            label="SKU"
            value={product.SKU}
            onChange={(e) => setProduct({ ...product, SKU: e.target.value })}
            disabled={editMode}
          />
          <TextField
            id="title"
            label="Product Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
          <TextField
            id="description"
            label="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <TextField
            id="size"
            label="Size"
            value={product.size}
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
          />
          <TextField
            id="contains"
            label="Contains"
            value={product.contains}
            onChange={(e) =>
              setProduct({ ...product, contains: e.target.value })
            }
          />
          <TextField
            id="cost"
            label="Cost Price"
            value={product.costPrice}
            onChange={(e) =>
              setProduct({ ...product, costPrice: e.target.value })
            }
          />
          <TextField
            id="price"
            label="Selling Price"
            value={product.sellingPrice}
            onChange={(e) =>
              setProduct({ ...product, sellingPrice: e.target.value })
            }
          />
          <div className={classes.btnContainer}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => backToProcuts(path)}
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </Container>
    </form>
  );
};

export default Product;
