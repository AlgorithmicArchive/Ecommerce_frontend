import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CustomCard({
  image,
  imageTitle,
  contentTitle,
  contentDiscription,
}) {
  return (
    <Card
      sx={{
        height: "80%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around", // Ensures content and button are spaced
        boxShadow: 5,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "40%", // Allows image to scale naturally
          objectFit: "contain", // Keeps the full image visible
        }}
        image={image}
        title={imageTitle}
        alt={imageTitle}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {contentTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {contentDiscription}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", padding: 1 }}>
        <Button size="small" variant="contained" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
