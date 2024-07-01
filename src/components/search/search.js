import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api"; // Adjust the import path as necessary

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    const url = `${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`;
  
    return fetch(url, geoApiOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        if (!response.data) {
          throw new Error('Response data is undefined');
        }
        return {
          options: response.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      })
      .catch((error) => {
        console.error(error);
        return {
          options: [],
        };
      });
  };
  

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // Ensure loadOptions is used
    />
  );
};

export default Search;
