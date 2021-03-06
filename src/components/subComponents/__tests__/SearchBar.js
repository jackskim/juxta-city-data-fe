import React from 'react';
import axios from 'axios';
import { render, fireEvent, wait } from '@testing-library/react';
import CityContext from '../../../contexts/CityContext';
import SearchBar from '../SearchBar';


jest.mock('axios', () => ({
  get: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

it('renders the search form', () => {
  let cityData = '';
  const setCityData = data => cityData = data;

  const { getByPlaceholderText } = render(
    <CityContext.Provider value={{setCityData}}>
      <SearchBar />
    </CityContext.Provider>
  );
  expect(getByPlaceholderText(/search for a city/i)).toBeInTheDocument();
});

it('displays a list of matching cities when characters are input', async () => {
  let cityData = '';
  const setCityData = data => cityData = data;
  const mockResponse =  [
    "Seaford, New York",
    "Seaside, Oregon",
    "Seabrook, Texas",
    "Seagoville, Texas",
    "Sealy, Texas",
    "SeaTac, Washington",
    "Seattle Hill Silver Firs, Washington",
    "Seattle, Washington",
    "Seabrook, New Hampshire",
    "Seabrook, Maryland",
    "Seal Beach, California",
    "Seaside, California",
    "Searcy, Arkansas"
  ];

  axios.get.mockResolvedValueOnce({
    data: mockResponse
  })

  const { getByPlaceholderText, findAllByText } = render(
    <CityContext.Provider value={{cityData, setCityData}}>
      <SearchBar />
    </CityContext.Provider>
  );

  let searchBar = getByPlaceholderText(/search for a city/i);

  fireEvent.change(searchBar, { target: { value: 's' } });
  expect(axios.get).toHaveBeenCalledTimes(0);

  fireEvent.change(searchBar, { target: { value: 'se' } });
  expect(axios.get).toHaveBeenCalledTimes(0);
  expect(searchBar.value).toBe('se');

  fireEvent.change(searchBar, { target: { value: 'sea' } });

  await wait(expect(axios.get).toHaveBeenCalledTimes(1));

  let dropdownCities = await findAllByText(/sea/i);

  expect(dropdownCities).toHaveLength(4);
  expect(dropdownCities[0].innerHTML).toMatch(/seaford, new york/i);
  expect(dropdownCities[1].innerHTML).toMatch(/seaside, oregon/i);
  expect(dropdownCities[2].innerHTML).toMatch(/seabrook, texas/i);
  expect(dropdownCities[3].innerHTML).toMatch(/seagoville, texas/i);

});
