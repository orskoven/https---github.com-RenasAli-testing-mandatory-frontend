import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';

// Styled Components
const PersonCardStyled = styled(motion.div)(({ theme }) => ({
  boxShadow: theme.shadows[8],
  borderRadius: '8px',
  padding: theme.spacing(2),
  backgroundColor: '#FFED00', // Matching the yellow background from the card
  border: '2px solid black',
  maxWidth: '400px',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
  // Adding the shine effect with pseudo-elements
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-75%',
    width: '50%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
    transition: 'left 0.75s ease',
  },
  '&:hover::before': {
    left: '125%',
  },
}));

function PersonCard({ person, selectedFields }) {
  // Helper function to check if a field should be displayed
  const shouldDisplay = (field) => selectedFields.includes(field);

  // Function to format CPR with a hyphen
  const formatCpr = (cpr) => {
    if (!cpr || cpr.length !== 10) return cpr;
    return `${cpr.slice(0, 6)}-${cpr.slice(6)}`;
  };

  return (
    <PersonCardStyled
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }} // Slight scaling effect when hovered
    >
      <CardContent sx={{ padding: 0 }}>
        {/* Header Section */}
        <Box sx={{ backgroundColor: '#FFFFFF', padding: '8px', borderBottom: '2px solid black' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: '#424242',
              textAlign: 'center',
            }}
          >
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '8px' }}>
          <strong>Kommune:</strong> {person.fakeAddress.townName || 'Vejle'}
          </Typography>
        </Box>

        {/* CPR Number - Simulating the card number section */}
        {shouldDisplay('cpr') && (
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', fontWeight: 'bold', marginY: '8px', letterSpacing: '2px' }}
          >
            {formatCpr(person.cpr) || '999999-9996'} {/* Placeholder or dynamic CPR */}
          </Typography>
        )}

        {/* Gender */}
        {shouldDisplay('person.gender') && (
          <Typography variant="body2" sx={{ textAlign: 'center', marginY: '8px' }}>
            <strong>Gender:</strong> {person.person.gender || 'Female'}
          </Typography>
        )}

 
        {/* Personal Information - Name */}
        {shouldDisplay('person.name') || shouldDisplay('person.surname') ? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#424242',
              textAlign: 'center',
            }}
          >
            {person.person.name || 'Lone'} {person.person.surname || 'Hansen'}
          </Typography>
        ) : null}

        {/* Address */}
        
        {shouldDisplay('fakeAddress') && person.fakeAddress && (
          <>
            <Typography variant="body2" sx={{ textAlign: 'center', marginBottom: '4px' }}>
            <strong>Adresse: </strong>
              {person.fakeAddress.street || 'Strandvejen'} {person.fakeAddress.number || '100'}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              {person.fakeAddress.postalCode || '9999'} {person.fakeAddress.townName || 'Vejstrand'}
            </Typography>
          </>
        )}

        {/* Phone Number */}
        {shouldDisplay('phoneNumber') && (
          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '8px' }}>
            <strong>Phone:</strong> {person.phoneNumber || '88 88 88 88'}
          </Typography>
        )}

        {/* Validity Period */}
        {shouldDisplay('validFrom') && person.validFrom && (
          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '8px' }}>
            <strong>Valid From:</strong> {new Date(person.validFrom).toLocaleDateString() || '21.09.2007'}
          </Typography>
        )}

        {/* Tourist Health Insurance Info */}
        {shouldDisplay('touristHealthInfo') && (
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'red',
              fontWeight: 'bold',
              marginTop: '16px',
            }}
          >
            Tourist Health Insurance Card {/* Static Text */}
          </Typography>
        )}

        {/* Barcode (Static Placeholder for now) */}
        <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
          <img
            src="https://dummyimage.com/200x40/000000/ffffff.png&text=||||||||||"
            alt="Barcode"
            style={{ width: '80%', margin: '0 auto' }}
          />
        </Box>
      </CardContent>
    </PersonCardStyled>
  );
}

export default PersonCard;
