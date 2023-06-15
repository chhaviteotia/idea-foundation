import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Card, 
  CardContent, Button, AppBar, Toolbar }
 from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Cards = () => {

  const [posts, setPosts] = useState([]);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categories = Array.from(new Set(posts.map((post) => post.userId)));

  const subcategoriesByCategory = categories.reduce((subcategories, category) => {
    const subcategoryCount = posts.filter((post) => post.userId === category).length;
    return { ...subcategories, [category]: subcategoryCount };
  }, {});

  const handleSubcategoryExpand = (subcategory) => {
    if (expandedSubcategory === subcategory) {
      setExpandedSubcategory(null);
    } else {
      setExpandedSubcategory(subcategory);
    }
  };

  const renderNewsItems = (userId) => {
    const newsItems = posts.filter((post) => post.userId === userId);

    return newsItems.map((newsItem) => (
      <Card key={newsItem.id} style={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {newsItem.title}
          </Typography>
          <Typography>{newsItem.body}</Typography>
          <Button variant="outlined" color="secondary" style={{ marginTop: '1rem' }}>
            Read Later
          </Button>
        </CardContent>
      </Card>
    ));
  };

  const renderSubcategories = (category) => {
    const subcategoryCount = subcategoriesByCategory[category];
    const subcategories = Array.from({ length: subcategoryCount }, (_, index) => index + 1);

    return subcategories.map((subcategory) => (
      <Accordion key={subcategory} expanded={expandedSubcategory === subcategory} onChange={() => handleSubcategoryExpand(subcategory)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Sub catg {subcategory}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{background:"grey"}}>
          <div style={{ width: '100%' }}>{renderNewsItems(category)}</div>
        </AccordionDetails>
      </Accordion>
    ));
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <Accordion key={category}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Category - {category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: '100%' }}>{renderSubcategories(category)}</div>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return <div>
    <header >
    <AppBar position="static">
      <Toolbar style={{background:"pink"}}>
        <Typography style ={{color:"green"}} variant="h4">News</Typography>
      </Toolbar>
    </AppBar>
    </header>
    {renderCategories()}
    </div>;
};

export default Cards;
