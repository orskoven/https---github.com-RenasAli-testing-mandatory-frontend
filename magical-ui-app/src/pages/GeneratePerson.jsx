import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import PersonTileList from '../components/PersonTile';

function GeneratePerson() {
  const [personData, setPersonData] = useState(null);
  const [bulkCount, setBulkCount] = useState(2);
  const [bulkData, setBulkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFields, setSelectedFields] = useState([
    'first_name',
    'last_name',
    'gender',
  ]);

  const fields = [
    { label: 'CPR', value: 'cpr' },
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Date of Birth', value: 'date_of_birth' },
    { label: 'Address', value: 'address' },
    { label: 'Mobile Phone Number', value: 'phone_number' },
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFields((prev) =>
      checked ? [...prev, value] : prev.filter((field) => field !== value)
    );
  };

  const fetchPersonData = async () => {
    setLoading(true);
    setError('');
    try {
      const fieldsParam = selectedFields.join(',');
      const response = await axios.get(
        `http://127.0.0.1:5000/api/person?fields=${fieldsParam}`
      );
      setPersonData(response.data);
    } catch (error) {
      setError('Failed to fetch person data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBulkData = async () => {
    setLoading(true);
    setError('');
    try {
      const fieldsParam = selectedFields.join(',');
      const response = await axios.get(
        `http://127.0.0.1:5000/api/persons/${bulkCount}?fields=${fieldsParam}`
      );
      setBulkData(response.data);
    } catch (error) {
      setError('Failed to fetch bulk data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPersonData = (data) => {
    return (
      <Card
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: '20px',
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffea00',
          border: '3px solid #e60000',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          {data.first_name && data.last_name && (
            <Typography
              variant='h5'
              style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              {data.first_name} {data.last_name}
            </Typography>
          )}
          {data.gender && (
            <Typography variant='body1' style={{ color: '#000' }}>
              Gender: {data.gender}
            </Typography>
          )}
          {data.date_of_birth && (
            <Typography variant='body1' style={{ color: '#000' }}>
              Date of Birth: {data.date_of_birth}
            </Typography>
          )}
          {data.cpr && (
            <Typography variant='body1' style={{ color: '#000' }}>
              CPR: {data.cpr}
            </Typography>
          )}
          {data.address && (
            <>
              <Typography variant='body1' style={{ color: '#000' }}>
                Address: {data.address.street} {data.address.number}, Floor{' '}
                {data.address.floor}, Door {data.address.door}
              </Typography>
              <Typography variant='body1' style={{ color: '#000' }}>
                {data.address.postal_code} {data.address.town_name}
              </Typography>
            </>
          )}
          {data.phone_number && (
            <Typography variant='body1' style={{ color: '#000' }}>
              Phone: {data.phone_number}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className='magic-container'>
      <Typography
        variant='h4'
        gutterBottom
        style={{ fontWeight: 'bold', color: '#333' }}
      >
        Generate Fake Person Data
      </Typography>

      {/* Field Selection */}
      <FormGroup row style={{ marginBottom: '20px' }}>
        {fields.map((field) => (
          <FormControlLabel
            key={field.value}
            control={
              <Checkbox
                checked={selectedFields.includes(field.value)}
                onChange={handleCheckboxChange}
                value={field.value}
              />
            }
            label={field.label}
          />
        ))}
      </FormGroup>

      {/* Single Person Generator */}
      <Button
        variant='contained'
        className='magic-button'
        onClick={fetchPersonData}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ marginBottom: '20px' }}
      >
        {loading ? (
          <CircularProgress size={24} color='inherit' />
        ) : (
          'Generate Single Person'
        )}
      </Button>

      {personData && renderPersonData(personData)}

      {/* Bulk Data Generator */}
      <Box style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
        <Typography variant='h5' gutterBottom>
          Generate Bulk Data
        </Typography>
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <TextField
              type='number'
              label='Number of Persons (2-100)'
              value={bulkCount}
              onChange={(e) => setBulkCount(e.target.value)}
              inputProps={{ min: 2, max: 100 }}
              style={{ width: '150px' }}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              className='magic-button'
              onClick={fetchBulkData}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Generate Bulk Data'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Display Bulk Data using PersonTileList */}
      {bulkData && <PersonTileList people={bulkData} fields={selectedFields} />}

      {error && (
        <Typography
          variant='body1'
          style={{ color: 'red', marginTop: '20px' }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default GeneratePerson;