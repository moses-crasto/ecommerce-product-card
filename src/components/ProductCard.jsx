import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const inStock = product.rating && product.rating.count > 100;

  const handleAddToCart = () => {
    toast.success("Added to cart");
    dispatch(addCart(product));
    setAdded(true);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 330,
        textAlign: "center",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        height="180"
        sx={{ objectFit: "contain", padding: "1rem" }}
      />

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {product.description.length > 60
            ? product.description.substring(0, 60) + "..."
            : product.description}
        </Typography>
      </CardContent>

      {/* Footer container to hold price bottom-left and button bottom-right */}
      <Box
        sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
        }}
        >
        <Typography 
            variant="h6" 
            sx={{ 
            fontWeight: "bold",
            marginTop: "8px"
            }}
        >
            ${product.price.toFixed(2)}
        </Typography>

        <Button
            variant="contained"
            color={added ? "success" : inStock ? "primary" : "error"}
            disabled={!inStock || added}
            onClick={inStock && !added ? handleAddToCart : undefined}
            sx={{ 
            minWidth: 120,
            borderRadius: "16px",
            mt: 1,
            textTransform: "none"
            }}
        >
            {added ? "Added" : inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        </Box>
    </Card>
  );
};

export default ProductCard;
