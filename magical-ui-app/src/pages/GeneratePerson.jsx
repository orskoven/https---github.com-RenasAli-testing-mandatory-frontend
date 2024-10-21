// File: GeneratePerson.jsx

import React, { useReducer } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import PersonTileList from '../components/PersonTileList';
import PersonCard from '../components/PersonCard'; // New Component

// Styled Components using MUI's styled API
const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: '#f0f4f8',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#212121',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  fontSize: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const FieldSelection = styled(FormGroup)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'center',
}));

const ButtonGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  justifyContent: 'center',
}));

const BulkSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  width: '100%',
  maxWidth: 800,
}));

// Initial state for reducer
const initialState = {
  personData: null,
  bulkData: null,
  bulkCount: 2,
  loading: false,
  selectedFields: [
    'cpr',
    'person.name',
    'person.surname',
    'person.gender',
    'birthDate',
    'fakeAddress',
    'phoneNumber',
  ],
  snackbar: {
    open: false,
    message: '',
    severity: 'error',
  },
};

// Reducer function for state management
function reducer(state, action) {
  switch (action.type) {
    case 'SET_PERSON_DATA':
      return { ...state, personData: action.payload };
    case 'SET_BULK_DATA':
      return { ...state, bulkData: action.payload };
    case 'SET_BULK_COUNT':
      return { ...state, bulkCount: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SELECTED_FIELDS':
      return { ...state, selectedFields: action.payload };
    case 'OPEN_SNACKBAR':
      return { ...state, snackbar: { open: true, ...action.payload } };
    case 'CLOSE_SNACKBAR':
      return { ...state, snackbar: { ...state.snackbar, open: false } };
    default:
      return state;
  }
}

function GeneratePerson() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { personData, bulkData, bulkCount, loading, selectedFields, snackbar } = state;

  const fields = [
    { label: 'CPR', value: 'cpr' },
    { label: 'First Name', value: 'person.name' },
    { label: 'Last Name', value: 'person.surname' },
    { label: 'Gender', value: 'person.gender' },
    { label: 'Date of Birth', value: 'birthDate' },
    { label: 'Address', value: 'fakeAddress' },
    { label: 'Mobile Phone Number', value: 'phoneNumber' },
  ];

  // Handle checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedFields = [];

    if (checked) {
      updatedFields = [...selectedFields, value];
    } else {
      updatedFields = selectedFields.filter((field) => field !== value);
    }

    dispatch({ type: 'SET_SELECTED_FIELDS', payload: updatedFields });
  };

  // Handle bulk count change with validation
  const handleBulkCountChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 2 && value <= 100) {
      dispatch({ type: 'SET_BULK_COUNT', payload: value });
    } else {
      dispatch({
        type: 'OPEN_SNACKBAR',
        payload: { message: 'Bulk count must be between 2 and 100', severity: 'warning' },
      });
    }
  };

  // Snackbar handler
  const handleCloseSnackbar = () => {
    dispatch({ type: 'CLOSE_SNACKBAR' });
  };

  // Centralized fetch function
  const fetchData = async (endpoint, params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axios.get(endpoint, { params });
      return response.data;
    } catch (err) {
      let errorMessage = 'An unexpected error occurred.';
      if (err.response) {
        errorMessage = `Error ${err.response.status}: ${err.response.data}`;
      } else if (err.request) {
        errorMessage = 'No response received from the server.';
      } else {
        errorMessage = `Error: ${err.message}`;
      }
      dispatch({
        type: 'OPEN_SNACKBAR',
        payload: { message: errorMessage, severity: 'error' },
      });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Consolidated API fetch handler
  const handleGenerate = async (endpoint, isBulk = false) => {
    const params = isBulk ? { n: bulkCount.toString() } : {};
    const data = await fetchData(endpoint, params);
    if (data) {
      if (isBulk) {
        dispatch({ type: 'SET_BULK_DATA', payload: data });
      } else {
        dispatch({ type: 'SET_PERSON_DATA', payload: data });
      }
    }
  };

  // Fetch functions for individual endpoints
  const fetchCPR = () => handleGenerate('http://localhost:5185/api/cpr');
  const fetchNameGender = () => handleGenerate('http://localhost:5185/api/name-gender');
  const fetchNameGenderDOB = () => handleGenerate('http://localhost:5185/api/name-gender-dob');
  const fetchCPRNameGender = () => handleGenerate('http://localhost:5185/api/cpr-name-gender');
  const fetchCPRNameGenderDOB = () => handleGenerate('http://localhost:5185/api/cpr-name-gender-dob');
  const fetchAddress = () => handleGenerate('http://localhost:5185/api/address');
  const fetchPhoneNumber = () => handleGenerate('http://localhost:5185/api/phone');

  // Fetch single person data with all fields
  const fetchPersonData = async () => {
    const data = await fetchData('http://localhost:5185/api/person');
    if (data) {
      dispatch({ type: 'SET_PERSON_DATA', payload: data });
    }
  };

  // Fetch bulk person data with all fields
  const fetchBulkData = async () => {
    if (bulkCount < 2 || bulkCount > 100) {
      dispatch({
        type: 'OPEN_SNACKBAR',
        payload: { message: 'Bulk count must be between 2 and 100', severity: 'warning' },
      });
      return;
    }
    const data = await fetchData('http://localhost:5185/api/persons', {
      n: bulkCount.toString(),
    });
    if (data) {
      dispatch({ type: 'SET_BULK_DATA', payload: data });
    }
  };

  return (
    <Container>
      <Title variant="h3">Generate Fake Person Data</Title>

      {/* Field Selection */}
      <FieldSelection row>
        {fields.map((field) => (
          <FormControlLabel
            key={field.value}
            control={
              <Checkbox
                checked={selectedFields.includes(field.value)}
                onChange={handleCheckboxChange}
                value={field.value}
                color="primary"
              />
            }
            label={field.label}
          />
        ))}
      </FieldSelection>

     
      {/* Single Person Generator */}
      <Box display="flex" justifyContent="center" mb={5}>
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchPersonData}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          sx={{
            paddingX: 6,
            paddingY: 2,
            fontSize: '1.1rem',
            boxShadow: 3,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          {loading ? <CircularProgress size={28} color="inherit" /> : 'Generate Single Person'}
        </Button>
      </Box>

      {/* Display Single Person Data */}
      {personData && <PersonCard person={personData} selectedFields={selectedFields} />}

      {/* Bulk Data Generator */}
      <BulkSection
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#212121' }}>
          Generate Bulk Data
        </Typography>
        <Grid container alignItems="center" spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="number"
              label="Number of Persons"
              value={bulkCount}
              onChange={handleBulkCountChange}
              inputProps={{ min: 2, max: 100 }}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={fetchBulkData}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              sx={{
                paddingY: 2,
                fontSize: '1rem',
                boxShadow: 3,
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              {loading ? <CircularProgress size={28} color="inherit" /> : 'Generate Bulk Data'}
            </Button>
          </Grid>
        </Grid>
      </BulkSection>

      {/* Display Bulk Data using PersonTileList */}
      {bulkData && <PersonTileList people={bulkData} selectedFields={selectedFields} />}

      {/* Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default GeneratePerson;
