import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Search = () => {
  const [cityInput, setCityInput] = useState("");
  const navigate = useNavigate();

  const searchClick = () => {
    if (cityInput) {
      navigate(`/weather?city=${cityInput}`);
      setCityInput("");
    }
  };

  return (
    <div className="search-container">
      <Form className="d-flex">
        <Form.Control 
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="City name"
          className="hakukenttä"
        />
        <Button className='hakunappi' onClick={searchClick}>
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Search;
