// File: PersonTileList.jsx

import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import PersonCard from './PersonCard';

// Styled Components
const ListContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

function PersonTileList({ people, selectedFields }) {
  if (!people || people.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
        No data available.
      </Typography>
    );
  }

  return (
    <ListContainer container spacing={4} justifyContent="center">
      {people.map((person, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <PersonCard person={person} selectedFields={selectedFields} />
        </Grid>
      ))}
    </ListContainer>
  );
}

export default PersonTileList;
