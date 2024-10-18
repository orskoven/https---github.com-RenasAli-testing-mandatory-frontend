// File: GeneratePerson.jsx

import React, { useReducer } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  //Checkbox,
 // FormControlLabel,
  //FormGroup,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import axios from 'axios';
import PersonTileList from '../components/PersonTile';

// Styled Components using MUI's styled API
const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#333',
  marginBottom: theme.spacing(3),
}));

/*const FieldSelection = styled(FormGroup)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));*/

const ButtonGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const BulkSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));


const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: '100%',
  maxWidth: 600,
  boxShadow: theme.shadows[3],
  backgroundColor: '#ffea00',
  border: '3px solid #e60000',
  borderRadius: theme.shape.borderRadius,
}));

// Initial state for reducer
const initialState = {
  personData: null,
  bulkData: null,
  bulkCount: 2,
  loading: false,
  error: '',
  selectedFields: ['first_name', 'last_name', 'gender'],
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
    case 'SET_ERROR':
      return { ...state, error: action.payload };
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
  const {
    personData,
    bulkData,
    bulkCount,
    loading,
    selectedFields,
    snackbar,
  } = state;

  /*const fields = [
    { label: 'CPR', value: 'cpr' },
    { label: 'First Name', value: 'name' },
    { label: 'Last Name', value: 'surname' },
    { label: 'Gender', value: 'gender' },
    { label: 'Date of Birth', value: 'birthDate' },
    { label: 'Address', value: 'fakeAddress' },
    { label: 'Mobile Phone Number', value: 'phoneNumber' },
  ];

  // Handle checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedFields = checked
      ? [...selectedFields, value]
      : selectedFields.filter((field) => field !== value);
    dispatch({ type: 'SET_SELECTED_FIELDS', payload: updatedFields });
  };*/

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
    dispatch({ type: 'SET_ERROR', payload: '' });
    try {
      const response = await axios.get(endpoint, { params });
      return response.data;
    } catch (err) {
      if (err.response) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          payload: {
            message: `Error ${err.response.status}: ${err.response.data}`,
            severity: 'error',
          },
        });
      } else if (err.request) {
        dispatch({
          type: 'OPEN_SNACKBAR',
          payload: {
            message: 'No response received from the server.',
            severity: 'error',
          },
        });
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          payload: { message: `Error: ${err.message}`, severity: 'error' },
        });
      }
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Consolidated API fetch handler
  const handleGenerate = async (endpoint, isBulk = false) => {
    const data = await fetchData(endpoint, isBulk ? { count: bulkCount } : {});
    console.log(data)
    if (data) {
      console.log(data)

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
  const fetchNameGenderDOB = () =>
    handleGenerate('http://localhost:5185/api/name-gender-dob');
  const fetchCPRNameGender = () =>
    handleGenerate('http://localhost:5185/api/cpr-name-gender');
  const fetchCPRNameGenderDOB = () =>
    handleGenerate('http://localhost:5185/api/cpr-name-gender-dob');
  const fetchAddress = () => handleGenerate('http://localhost:5185/api/address');
  const fetchPhoneNumber = () => handleGenerate('http://localhost:5185/api/phone');
  const fetchPersonData = async () => {
    const fieldsParam = selectedFields.join(',');
    const data = await fetchData('http://localhost:5185/api/person', { fields: fieldsParam });
    if (data) {
      dispatch({ type: 'SET_PERSON_DATA', payload: data });
    }
  };
  const fetchBulkData = async () => {
    if (bulkCount < 2 || bulkCount > 100) {
      dispatch({
        type: 'OPEN_SNACKBAR',
        payload: { message: 'Bulk count must be between 2 and 100', severity: 'warning' },
      });
      return;
    }
    const data = await fetchData(`http://localhost:5185/api/persons?n=${bulkCount}`);
    if (data) {
      dispatch({ type: 'SET_BULK_DATA', payload: data });
    }
  };

  // Render person data in a styled card
  const renderPersonData = (data) => (
    <StyledCard
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CardContent>
        {data.name && data.surname && (
          <Typography variant="h5" sx={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', mb: 1 }}>
            {data.name} {data.surname}
          </Typography>
        )}
        {data.gender && <Typography variant="body1">Gender: {data.gender}</Typography>}
        {data.birthDate && (
          <Typography variant="body1">Date of Birth: {new Date(data.birthDate).toLocaleDateString()}</Typography>
        )}
        {data.cpr && <Typography variant="body1">CPR: {data.cpr}</Typography>}
        {data.fakeAddress && (
          <>
            <Typography variant="body1">
              Address: {data.fakeAddress.street} {data.fakeAddress.number}, Floor {data.fakeAddress.floor}, Door {data.fakeAddress.door}
            </Typography>
            <Typography variant="body1">
              {data.fakeAddress.postalCode} {data.fakeAddress.townName}
            </Typography>
          </>
        )}
        {data.street && (
          <>
            <Typography variant="body1">
              Address: {data.street} {data.number}, Floor {data.floor}, Door {data.door}
            </Typography>
            <Typography variant="body1">
              {data.postalCode} {data.townName}
            </Typography>
          </>
        )}
        {data.phoneNumber && <Typography variant="body1">Phone: {data.phoneNumber}</Typography>}
      </CardContent>
    </StyledCard>
  );

  return (
    <Container>
      <Title variant="h4">Generate Fake Person Data</Title>

      {/* Field Selection 
      <FieldSelection row>
        {fields?.map((field) => (
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
      </FieldSelection>*/}

      {/* Buttons for Individual Data Generators */}
      <ButtonGrid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchCPR}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate CPR'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchNameGender}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Name & Gender'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchNameGenderDOB}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Name, Gender & DOB'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchCPRNameGender}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate CPR, Name & Gender'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchCPRNameGenderDOB}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate CPR, Name, Gender & DOB'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchAddress}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Address'}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={fetchPhoneNumber}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Phone Number'}
          </Button>
        </Grid>
      </ButtonGrid>

      {/* Single Person Generator */}
      <Button
        variant="contained"
        onClick={fetchPersonData}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        sx={{ marginBottom: 3 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Single Person'}
      </Button>

      {/* Display Single Person Data */}
      {personData && renderPersonData(personData)}

      {/* Bulk Data Generator */}
      <BulkSection>
        <Typography variant="h5" gutterBottom>
          Generate Bulk Data
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              type="number"
              label="Number of Persons"
              value={bulkCount}
              onChange={handleBulkCountChange}
              inputProps={{ min: 2, max: 100 }}
              sx={{ width: 150 }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={fetchBulkData}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Bulk Data'}
            </Button>
          </Grid>
        </Grid>
      </BulkSection>
      {console.log(bulkData)}
      {/* Display Bulk Data using PersonTileList */}
      {bulkData &&
      
       <PersonTileList people={bulkData} fields={selectedFields} />}

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