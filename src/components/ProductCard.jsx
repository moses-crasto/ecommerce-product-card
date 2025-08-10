import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Button, MenuItem, Select
} from "@mui/material";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Simulate stock based on rating count, e.g. in stock if count > 100
  const inStock = product.rating && product.rating.count > 100;

  const handleAddToCart = () => {
    toast.success("Added to cart");
    dispatch(addCart(product));
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textAlign: "center"
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        height="200"
        sx={{ objectFit: "contain", padding: "1rem" }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">
          {product.title.length > 20
            ? product.title.substring(0, 20) + "..."
            : product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description.length > 60
            ? product.description.substring(0, 60) + "..."
            : product.description}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color={inStock ? "primary" : "inherit"}
          disabled={!inStock}
          onClick={inStock ? handleAddToCart : undefined}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
