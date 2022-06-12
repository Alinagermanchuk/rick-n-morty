import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import {
  CHARACTER_GENDER_OPTIONS,
  CHARACTER_SPECIES_OPTIONS,
  CHARACTER_STATUS_OPTIONS,
} from "../constants";
import { FiltersSelect } from "./FiltersSelect";

export function Filters({ filters, filterActions }) {
  const {
    setStatusHandler,
    setSpeciesHandler,
    setGenderHandler,
    setNameHandler,
    resetFiltersHandler,
  } = filterActions;

  const [nameValue, setNameValue] = useState(filters.name);

  function resetFilters() {
    resetFiltersHandler();
    setNameValue("");
  }

  return (
    <Form
      className="my-3"
      onSubmit={(event) => {
        event.preventDefault();
        setNameHandler(nameValue);
      }}
    >
      <Row>
        <Form.Group as={Col}>
          <FiltersSelect
            options={CHARACTER_STATUS_OPTIONS}
            label="Select Status:"
            value={filters.status}
            setValue={setStatusHandler}
          />
        </Form.Group>

        <Form.Group as={Col} className="mx-2">
          <FiltersSelect
            options={CHARACTER_SPECIES_OPTIONS}
            label="Select Species:"
            value={filters.species}
            setValue={setSpeciesHandler}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <FiltersSelect
            options={CHARACTER_GENDER_OPTIONS}
            label="Select Gender:"
            value={filters.gender}
            setValue={setGenderHandler}
          />
        </Form.Group>
      </Row>

      <Row className="mt-3">
        <Col xs={6}>
          <InputGroup>
            <Form.Control
              style={{ borderRadius: "5px 0 0 5px" }}
              value={nameValue}
              placeholder="Search by character name"
              onChange={(e) => setNameValue(e.target.value)}
            />
            <Button
              className="h-100"
              style={{ borderRadius: "0 5px 5px 0" }}
              variant="outline-secondary"
              type="submit"
            >
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col xs={{ span: 2, offset: 4 }} style={{ textAlign: "end" }}>
          <Button variant="outline-secondary" onClick={resetFilters}>
            Clear Filters &nbsp;
            <Trash />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
