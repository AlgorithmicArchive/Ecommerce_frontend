import { LocalShipping, Lock, Replay, SupportAgent } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomCard from "../components/CustomCard";
import HeroBannerCarousel from "../components/LandingPage/HeroBanner";
import FeaturedCategories from "../components/LandingPage/FeaturedCategories";
import TopSellingNewArrivals from "../components/LandingPage/TopSellingNewArrivals";
import DealsSection from "../components/LandingPage/DealsSection";
import TrustBadges from "../components/LandingPage/TrushBadges";
import NewsletterSignup from "../components/LandingPage/NewsLetterSignup";
import Testimonials from "../components/LandingPage/Testimonials";

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
            width: "100%",
            padding:0
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
            <HeroBannerCarousel/>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: '#f5f5f5',
          height: { xs: "auto", lg: "90vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 5,
        }}
      >
        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 100,
          }}
        >
       
          <FeaturedCategories/>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: { xs: "auto", lg: "90vh" },
        }}
      >
        <Container
          fluid
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100%',
          }}
        >
          <TopSellingNewArrivals/>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          height: { xs: "auto", lg: "90vh" },
        }}
      >
        <Container
          fluid
          style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100%',
          }}
        >
          <DealsSection/>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: { xs: "150vh", lg: "90vh" },
        }}
      >
        <Container
          fluid
          style={{
            display:'flex',
            justifyContent:'center',
            height:'100%',
          }}
        >
          <NewsletterSignup/>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: { xs: "auto", lg: "50vh" },
        }}
      >
        <Container
          fluid
          style={{
            display:'flex',
            justifyContent:'center',
            height:'100%',
          }}
        >
          <Testimonials/>
        </Container>
      </Box>
    </>
  );
}
