import { LocalShipping, Lock, Replay, SupportAgent } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomCard from "../components/CustomCard";

export default function LandingPage() {
  const products = [
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Polo",
      contentTitle: "Allen Solly Men's Solid Regular Fit Polo",
      contentDescription:
        "Aditya Birla Fashion and Retail Limited, Aditya Birla Fashion & Retail Ltd, 7th Flr, Skyline Ikon Business Park, AK Road, Andheri East, Mumbai-400059.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Shirt",
      contentTitle: "Van Heusen Men's Formal Shirt",
      contentDescription: "Van Heusen, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "T-Shirt",
      contentTitle: "Nike Men's Graphic T-Shirt",
      contentDescription: "Nike India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Jacket",
      contentTitle: "Puma Men's Lightweight Jacket",
      contentDescription: "Puma India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Jeans",
      contentTitle: "Levi's Men's Slim Fit Jeans",
      contentDescription: "Levi's India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Sweater",
      contentTitle: "H&M Men's Crewneck Sweater",
      contentDescription: "H&M India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Hoodie",
      contentTitle: "Adidas Men's Pullover Hoodie",
      contentDescription: "Adidas India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Shorts",
      contentTitle: "Under Armour Men's Training Shorts",
      contentDescription: "Under Armour India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Cap",
      contentTitle: "New Era Men's Baseball Cap",
      contentDescription: "New Era India, Bengaluru-560037.",
    },
    {
      image: "/assets/images/product_1.jpg",
      imageTitle: "Socks",
      contentTitle: "Balenciaga Men's Crew Socks",
      contentDescription: "Balenciaga India, Bengaluru-560037.",
    },
  ];
  return (
    <>
      <Box sx={{ backgroundColor: "#f8f8f8", height: "90vh" }}>
        <Container
          fluid
          style={{
            height: "100%",
            width: "90%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Row style={{ width: "100%" }}>
              <Col
                xs={12}
                lg={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 40,
                  alignItems: "start", // This centers children horizontally
                  justifyContent: "center",
                  textAlign: "center", // This centers text within children
                }}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: "'Pacifico', cursive",
                      color: "dodgerblue",
                    }}
                  >
                    Season Sale
                  </Typography>
                  <Typography variant="h2">MEN'S FASHION</Typography>
                  <Typography variant="subtitle" sx={{ fontSize: 24 }}>
                    Min 35 to 70% Off
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0066cd",
                    color: "#FFFFFF",
                    width: { xs: "100%", lg: "20%" },
                  }}
                >
                  Shop Now
                </Button>
              </Col>
              <Col
                xs={12}
                lg={6}
                style={{
                  display: "flex",
                  alignItems: "center", // This centers children horizontally
                  textAlign: "center", // This centers text within children
                  justifyContent: "end",
                }}
              >
                <Box
                  sx={{
                    display: { xs: "none", lg: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                  }}
                  component={"img"}
                  src="/assets/images/Section1.png"
                />
              </Col>
            </Row>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: { xs: "auto", lg: "130vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 5,
        }}
      >
        <Container
          fluid
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: 100,
          }}
        >
          <Row>
            <Col
              xs={12}
              lg={3}
              style={{
                display: "flex",
                justifyContent: { xs: "center", lg: "start" },
              }}
            >
              <Box sx={{ display: "flex", gap: 5 }}>
                <LocalShipping sx={{ fontSize: 80, color: "dodgerblue" }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                    Free Shipping
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    On All Orders Over Rs 2000
                  </Typography>
                </Box>
              </Box>
            </Col>
            <Col
              xs={12}
              lg={3}
              style={{
                display: "flex",
                justifyContent: { xs: "center", lg: "start" },
              }}
            >
              <Box sx={{ display: "flex", gap: 5 }}>
                <Lock sx={{ fontSize: 80, color: "dodgerblue" }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                    Secure Payment
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    We ensure secure payment
                  </Typography>
                </Box>
              </Box>
            </Col>
            <Col
              xs={12}
              lg={3}
              style={{
                display: "flex",
                justifyContent: { xs: "center", lg: "start" },
              }}
            >
              <Box sx={{ display: "flex", gap: 5 }}>
                <Replay sx={{ fontSize: 80, color: "dodgerblue" }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                    100% Money Back
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    30 Days Return Policy
                  </Typography>
                </Box>
              </Box>
            </Col>
            <Col
              xs={12}
              lg={3}
              style={{
                display: "flex",
                justifyContent: { xs: "center", lg: "end" },
              }}
            >
              <Box sx={{ display: "flex", gap: 5 }}>
                <SupportAgent sx={{ fontSize: 80, color: "dodgerblue" }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                    Online Support
                  </Typography>
                  <Typography sx={{ fontSize: 14 }}>
                    24/7 Dedicated Support
                  </Typography>
                </Box>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              lg={6}
              style={{ display: "flex", justifyContent: "start" }}
            >
              <Box
                component="img"
                src="/assets/images/section2_1.jpg"
                alt="Section 2 Image" // Add alt for accessibility
                sx={{
                  width: "100%", // Fill the Col's width
                  maxWidth: "100%", // Prevent overflow
                  height: "auto", // Maintain aspect ratio
                  objectFit: "cover", // Ensure image is fully visible without cropping
                  backgroundColor: "#333333", // Optional: keep background
                  color: "#FFFFFF", // Optional: for text or fallback
                }}
              />
            </Col>
            <Col
              xs={12}
              lg={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Row>
                <Col xs={12} lg={6}>
                  <Box
                    sx={{
                      backgroundColor: "#333333",
                      width: "100%",
                      height: "80%",
                      color: "#FFFFFF",
                    }}
                    component={"img"}
                    src="/assets/images/section2_2.jpg"
                  />
                </Col>
                <Col
                  xs={12}
                  lg={6}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#333333",
                      width: "100%",
                      height: "80%",
                      color: "#FFFFFF",
                    }}
                    component={"img"}
                    src="/assets/images/section2_3.jpg"
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 5 }}>
                <Col xs={12} lg={12}>
                  <Box
                    sx={{
                      backgroundColor: "#333333",
                      width: "100%",
                      color: "#FFFFFF",
                    }}
                    component={"img"}
                    src="/assets/images/section2_4.jpg"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: { xs: "auto", lg: "130vh" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          fluid
          style={{
            width: "90%",
            // backgroundColor: "red",
          }}
        >
          <Row>
            <Col xs={12} lg={12}>
              <Typography variant="h2" textAlign={"center"}>
                Featured Products
              </Typography>
            </Col>
          </Row>
          <Row
            style={{
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            {products.map((product, index) => (
              <Col xs={12} sm={6} md={4} lg={2} key={index}>
                <CustomCard
                  image={product.image}
                  imageTitle={product.imageTitle}
                  contentTitle={product.contentTitle}
                  contentDiscription={product.contentDescription}
                />
              </Col>
            ))}
          </Row>
          {/* <Row
            style={{
              justifyContent: "center",
              marginTop: 40,
              padding: 16,
            }}
          >
            {products.slice(5, 10).map((product, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={2}
                key={index}
                style={{ marginBottom: 16 }}
              >
                <CustomCard
                  image={product.image}
                  imageTitle={product.imageTitle}
                  contentTitle={product.contentTitle}
                  contentDiscription={product.contentDescription}
                />
              </Col>
            ))}
          </Row> */}
        </Container>
      </Box>
    </>
  );
}
