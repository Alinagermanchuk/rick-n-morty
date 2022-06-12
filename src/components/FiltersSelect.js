import { Form } from "react-bootstrap";

export function FiltersSelect({ setValue, value, options, label }) {
  function onChangeHandler(event) {
    setValue(event.target.value);
  }

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Select onChange={onChangeHandler} value={value}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </>
  );
}
