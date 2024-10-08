Welcome! 

This is a vite.js + react.js app to facilitate the backend service of a C# fake person generator.

To run the project 

  
  
                                                  npm install  
                                                  npm run dev






These commands will : 

  1. open project from root project folder magical-ui-app (something like that) 
  2. run the following command ensuring npm dependencies are installed:


This frontend should follow busniess rules: 


1. Return a fake CPR
2. Return a fake first name, last name and gender
3. Return a fake first name, last name, gender and date of birth
4. Return a fake CPR, first name, last name and gender
5. Return a fake CPR, first name, last name, gender and date of birth
6. Return a fake address
7. Return a fake mobile phone number
9. Return all information for a fake person       
        - (CPR, first name, last name, gender, date of birth, address, mobile phone number)
10. Return fake person information in bulk (all information for 2 to 100 persons)


# API Documentation for GeneratePerson Component

This documentation provides detailed information about the API endpoints used by the `GeneratePerson` React component. The API is designed to generate fake Danish personal data for testing purposes, fulfilling all specified requirements.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [1. Get Fake CPR](#1-get-fake-cpr)
  - [2. Get Name and Gender](#2-get-name-and-gender)
  - [3. Get Name, Gender, and Date of Birth](#3-get-name-gender-and-date-of-birth)
  - [4. Get CPR, Name, and Gender](#4-get-cpr-name-and-gender)
  - [5. Get CPR, Name, Gender, and Date of Birth](#5-get-cpr-name-gender-and-date-of-birth)
  - [6. Get Address](#6-get-address)
  - [7. Get Mobile Phone Number](#7-get-mobile-phone-number)
  - [8. Get All Information for a Fake Person](#8-get-all-information-for-a-fake-person)
  - [9. Get Fake Person Information in Bulk](#9-get-fake-person-information-in-bulk)
- [Data Models](#data-models)
- [Examples](#examples)
- [Frontend Implementation](#frontend-implementation)

## Overview

The API provides endpoints to generate various pieces of fake personal data, including CPR numbers, names, addresses, and more. This data is generated according to specific formats and constraints to simulate real Danish personal information.

## Authentication

No authentication is required to use these endpoints.

## Error Handling

All endpoints return standard HTTP status codes to indicate the success or failure of an API request. In case of an error, the response will include an error message in JSON format.

- **200 OK**: The request was successful.
- **400 Bad Request**: The request was invalid or cannot be served.
- **500 Internal Server Error**: An error occurred on the server.

## Endpoints

### 1. Get Fake CPR

**Endpoint**

```
GET /api/cpr
```

**Description**

Generates a fake CPR number adhering to the Danish format:

- **Format**: 10 numeric digits `ddMMyyxxxx`
  - The first six digits represent the date of birth (`ddMMyy`).
  - The last four digits are randomly generated:
    - The last digit is even for females.
    - The last digit is odd for males.

**Response**

```json
{
  "cpr": "ddMMyyxxxx"
}
```

### 2. Get Name and Gender

**Endpoint**

```
GET /api/name_gender
```

**Description**

Returns a fake first name, last name, and gender, randomly extracted from the provided `person-names.json` file.

**Response**

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "gender": "Male"
}
```

### 3. Get Name, Gender, and Date of Birth

**Endpoint**

```
GET /api/name_gender_dob
```

**Description**

Returns a fake first name, last name, gender, and date of birth. The date of birth matches the date in the CPR number when used together.

**Response**

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "gender": "Female",
  "date_of_birth": "dd-MM-yyyy"
}
```

### 4. Get CPR, Name, and Gender

**Endpoint**

```
GET /api/cpr_name_gender
```

**Description**

Returns a fake CPR number, first name, last name, and gender.

**Response**

```json
{
  "cpr": "ddMMyyxxxx",
  "first_name": "Peter",
  "last_name": "Andersen",
  "gender": "Male"
}
```

### 5. Get CPR, Name, Gender, and Date of Birth

**Endpoint**

```
GET /api/cpr_name_gender_dob
```

**Description**

Returns a fake CPR number, first name, last name, gender, and date of birth.

**Response**

```json
{
  "cpr": "ddMMyyxxxx",
  "first_name": "Anna",
  "last_name": "Larsen",
  "gender": "Female",
  "date_of_birth": "dd-MM-yyyy"
}
```

### 6. Get Address

**Endpoint**

```
GET /api/address
```

**Description**

Returns a fake address, generated according to Danish addressing standards:

- **Street**: Random assortment of alphabetic characters.
- **Number**: Number from 1 to 999, optionally followed by an uppercase letter.
- **Floor**: Either "st" or a number from 1 to 99.
- **Door**: Various formats (e.g., "th", "mf", "tv", or combinations of letters and numbers).
- **Postal Code and Town**: Randomly extracted from the provided `addresses.sql` database.

**Response**

```json
{
  "address": {
    "street": "Main Street",
    "number": "123B",
    "floor": "2",
    "door": "th",
    "postal_code": "1000",
    "town_name": "Copenhagen"
  }
}
```

### 7. Get Mobile Phone Number

**Endpoint**

```
GET /api/phone_number
```

**Description**

Returns a fake mobile phone number following Danish numbering rules:

- **Format**: Eight numeric digits.
- **Valid Starting Combinations**: Starts with specified combinations as per Danish regulations (e.g., "2", "30", "31", etc.).

**Response**

```json
{
  "phone_number": "12345678"
}
```

### 8. Get All Information for a Fake Person

**Endpoint**

```
GET /api/person
```

**Description**

Returns all available information for a fake person.

**Query Parameters**

- `fields` (optional): Comma-separated list of fields to include in the response. Available fields include:
  - `cpr`
  - `first_name`
  - `last_name`
  - `gender`
  - `date_of_birth`
  - `address`
  - `phone_number`

**Response**

```json
{
  "cpr": "ddMMyyxxxx",
  "first_name": "Lars",
  "last_name": "Hansen",
  "gender": "Male",
  "date_of_birth": "dd-MM-yyyy",
  "address": { ... },
  "phone_number": "29876543"
}
```

### 9. Get Fake Person Information in Bulk

**Endpoint**

```
GET /api/persons/{count}
```

**Description**

Returns all information for multiple fake persons.

**Path Parameters**

- `count` (required): The number of fake persons to generate (integer between 2 and 100).

**Query Parameters**

- `fields` (optional): Comma-separated list of fields to include in the response.

**Response**

```json
[
  {
    "cpr": "ddMMyyxxxx",
    "first_name": "Maria",
    "last_name": "Nielsen",
    "gender": "Female",
    "date_of_birth": "dd-MM-yyyy",
    "address": { ... },
    "phone_number": "12345678"
  },
  {
    "cpr": "ddMMyyxxxx",
    "first_name": "Thomas",
    "last_name": "Jensen",
    "gender": "Male",
    "date_of_birth": "dd-MM-yyyy",
    "address": { ... },
    "phone_number": "87654321"
  }
  // ...additional persons
]
```

## Data Models

### Person Object

- `cpr` (string): 10-digit CPR number in the format `ddMMyyxxxx`.
- `first_name` (string): First name of the person.
- `last_name` (string): Last name of the person.
- `gender` (string): Gender of the person (`Male` or `Female`).
- `date_of_birth` (string): Date of birth in the format `dd-MM-yyyy`.
- `address` (object):
  - `street` (string): Street name.
  - `number` (string): Street number, possibly with a letter (e.g., `123B`).
  - `floor` (string): Floor number or `st` for ground floor.
  - `door` (string): Door identifier (e.g., "th", "mf", "tv", or combinations).
  - `postal_code` (string): Postal code.
  - `town_name` (string): Name of the town or city.
- `phone_number` (string): 8-digit mobile phone number starting with valid combinations.

## Examples

### Example 1: Fetching a Fake CPR

**Request**

```
GET /api/cpr
```

**Response**

```json
{
  "cpr": "0101901234"
}
```

### Example 2: Fetching Name and Gender

**Request**

```
GET /api/name_gender
```

**Response**

```json
{
  "first_name": "Sofie",
  "last_name": "Larsen",
  "gender": "Female"
}
```

### Example 3: Fetching All Information for a Fake Person

**Request**

```
GET /api/person
```

**Response**

```json
{
  "cpr": "1502755678",
  "first_name": "Michael",
  "last_name": "Kristensen",
  "gender": "Male",
  "date_of_birth": "15-02-1975",
  "address": {
    "street": "Østerbrogade",
    "number": "45A",
    "floor": "3",
    "door": "tv",
    "postal_code": "2100",
    "town_name": "København Ø"
  },
  "phone_number": "31234567"
}
```

### Example 4: Fetching Bulk Data with Selected Fields

**Request**

```
GET /api/persons/5?fields=first_name,last_name,phone_number
```

**Response**

```json
[
  {
    "first_name": "Emma",
    "last_name": "Poulsen",
    "phone_number": "29876543"
  },
  // ...4 more persons
]
```

## Frontend Implementation

The `GeneratePerson` component in the frontend code interacts with these API endpoints, ensuring that all API requirements are correctly implemented.

### Field Selection

Users can select which fields to include in the response. The selected fields are used to construct the `fields` query parameter.

**Frontend Code Snippet**

```javascript
const fieldsParam = selectedFields.join(',');
```

### Fetching Single Person Data

The frontend fetches single person data using the `/api/person` endpoint, including the selected fields.

**Frontend Code Snippet**

```javascript
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
  } finally {
    setLoading(false);
  }
};
```

### Fetching Bulk Data

The frontend allows users to specify a `bulkCount` between 2 and 100 and fetches data using the `/api/persons/{count}` endpoint.

**Frontend Code Snippet**

```javascript
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
  } finally {
    setLoading(false);
  }
};
```

### Rendering Data

The frontend renders the fetched data, displaying all included fields, and adheres to the data formats and constraints specified in the API documentation.

**Example Rendering Code**

```javascript
{personData && (
  <Card>
    <CardContent>
      {personData.first_name && personData.last_name && (
        <Typography variant='h5'>
          {personData.first_name} {personData.last_name}
        </Typography>
      )}
      {personData.cpr && <Typography>CPR: {personData.cpr}</Typography>}
      {/* Additional fields */}
    </CardContent>
  </Card>
)}
```

### Constraints and Validations

- **CPR Number**: The frontend relies on the API to provide CPR numbers in the correct format.
- **Date of Birth**: When `date_of_birth` is selected, it matches the date in the CPR number.
- **Mobile Phone Number**: The frontend displays phone numbers starting with valid combinations, as provided by the API.
- **Bulk Count Validation**: The `bulkCount` input field restricts values between 2 and 100.

### Error Handling

The frontend handles errors gracefully, displaying messages to the user when data fetching fails.

**Error Handling Code Snippet**

```javascript
catch (error) {
  setError('Failed to fetch person data');
}
```

## Conclusion

The `GeneratePerson` component, along with the outlined API endpoints, ensures that all API requirements are correctly implemented in the frontend code. Users can select specific data fields, generate single or multiple fake person records, and the data conforms to the specified formats and constraints.

By adhering to this API documentation, developers can understand how to interact with the API and verify that the frontend code meets all the functional requirements.

---

**Note:** The implementation assumes that the backend API correctly generates data according to the specified formats and constraints. The frontend component is designed to interact with these endpoints and display the data accordingly.
