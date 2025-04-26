import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h3" style={{ fontFamily: "'Pacifico', cursive" }}>
        ShopEase
      </Typography>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderWidth: 1, borderColor: "#333333" }}
      />
      <Typography variant="subtitle1">
        Copyright 2025. Vid Kraijic Radulovic. All rights resevered.
      </Typography>
    </Box>
  );
}
