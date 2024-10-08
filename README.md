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



# GeneratePerson Component Documentation

The `GeneratePerson` component is a React functional component designed to generate fake person data. It provides an interactive user interface that allows users to select specific fields to include in the generated data and supports both single and bulk data generation. The component utilizes Material-UI for styling and layout, Framer Motion for animations, and Axios for API requests.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Importing the Component](#importing-the-component)
  - [Rendering the Component](#rendering-the-component)
- [Component Structure](#component-structure)
  - [State Variables](#state-variables)
  - [Functions](#functions)
  - [Rendering Logic](#rendering-logic)
- [API Integration](#api-integration)
- [Customization](#customization)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)
- [Notes](#notes)
- [Example](#example)
- [License](#license)

## Overview

The `GeneratePerson` component serves as a tool for generating fake person data, which can be useful for testing, development, or demonstration purposes. It provides options to select specific data fields, generate individual or multiple records, and displays the generated data in a user-friendly format.

## Features

- **Field Selection**: Choose from various data fields such as first name, last name, gender, address, etc.
- **Single Person Generation**: Generate a single fake person based on selected fields.
- **Bulk Data Generation**: Generate multiple fake persons (up to 100) at once.
- **Interactive UI**: Engaging and responsive user interface with animations.
- **Error Handling**: Displays error messages if data fetching fails.
- **Loading Indicators**: Shows a loading spinner during data fetching.

## Prerequisites

- **React**: Version 16.8 or higher (for Hooks support).
- **Node.js**: Version 12 or higher.
- **API Server**: A running API server that responds to the specified endpoints.

## Installation

Install the required dependencies using npm or yarn:

```bash
npm install react @mui/material framer-motion axios
```

or

```bash
yarn add react @mui/material framer-motion axios
```

## Usage

### Importing the Component

Import the `GeneratePerson` component into your React application:

```javascript
import GeneratePerson from './path/to/GeneratePerson';
```

### Rendering the Component

Include the component within your application's render method or return statement:

```jsx
function App() {
  return (
    <div>
      <GeneratePerson />
    </div>
  );
}

export default App;
```

## Component Structure

### State Variables

- **`personData`** (`object`): Stores the data of a single generated person.
- **`bulkData`** (`array`): Stores the data of multiple generated persons.
- **`bulkCount`** (`number`): The number of persons to generate in bulk (default is 2).
- **`loading`** (`boolean`): Indicates whether data is currently being fetched.
- **`error`** (`string`): Stores error messages, if any.
- **`selectedFields`** (`array`): The list of selected data fields to include.

### Functions

- **`handleCheckboxChange(event)`**: Updates `selectedFields` based on user selections.
- **`fetchPersonData()`**: Fetches a single person's data from the API.
- **`fetchBulkData()`**: Fetches multiple persons' data from the API.
- **`renderPersonData(data)`**: Renders the person data into a styled card.

### Rendering Logic

- **Field Selection**: Renders checkboxes for each available data field.
- **Single Person Generation**: Provides a button to generate a single person.
- **Bulk Data Generation**: Includes an input for the number of persons and a button to generate bulk data.
- **Data Display**: Shows the generated data using Material-UI components.
- **Error Display**: Displays error messages in red text if any errors occur.

## API Integration

The component interacts with a backend API to fetch person data.

- **Single Person Endpoint**:
  ```
  GET http://127.0.0.1:5000/api/person?fields={selectedFields}
  ```
- **Bulk Persons Endpoint**:
  ```
  GET http://127.0.0.1:5000/api/persons/{bulkCount}?fields={selectedFields}
  ```
- **Parameters**:
  - **`fields`**: A comma-separated list of selected fields.
  - **`bulkCount`**: The number of persons to generate (for bulk data).

> **Note**: Ensure the API server is running and accessible at the specified endpoints.

## Customization

- **API Endpoint**: Update the API base URL if your server is hosted elsewhere.
- **Fields**: Modify the `fields` array to add or remove available data fields.
- **Styling**: Adjust inline styles or replace them with CSS classes as needed.
- **Animations**: Customize or remove Framer Motion animations according to your preferences.

## Error Handling

- Displays a user-friendly error message if data fetching fails.
- Logs detailed error information to the console for debugging.

## Dependencies

- **React**: For building the user interface.
- **@mui/material**: For Material Design components and styling.
- **Framer Motion**: For adding animations to the UI.
- **Axios**: For making HTTP requests to the API.
- **PersonTileList**: A custom component for displaying a list of persons (ensure it is correctly imported and available).

## Notes

- **State Management**: The component uses React Hooks (`useState`) for state management.
- **Input Validation**: The `bulkCount` input field restricts values between 2 and 100.
- **Responsive Design**: The component is designed to be responsive and should adapt to various screen sizes.

## Example

Below is a complete example of how to integrate the `GeneratePerson` component into your application:

```jsx
import React from 'react';
import GeneratePerson from './components/GeneratePerson';

function App() {
  return (
    <div>
      <GeneratePerson />
    </div>
  );
}

export default App;
```

## License

This component is provided "as is" without any warranties. Use it at your own risk.

---

By following this documentation, developers can seamlessly integrate and utilize the `GeneratePerson` component within their React applications to generate fake person data for various purposes.
