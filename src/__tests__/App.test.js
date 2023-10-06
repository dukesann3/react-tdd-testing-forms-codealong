import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import App from "../App";

// Pepperoni checkbox
test("checkbox is initially unchecked", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  expect(addPepperoni).not.toBeChecked();
});

test("checkbox appears as checked when user clicks it", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("checkbox appears as unchecked when user clicks a second time", () => {
  render(<App />);

  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  userEvent.click(addPepperoni);

  expect(addPepperoni).toBeChecked();

  userEvent.click(addPepperoni);

  expect(addPepperoni).not.toBeChecked();
});

// Size select element
test("'size select element initially displays 'Small'", () => {
  render(<App />);

  const sizeSelect = screen.getByLabelText(/select size/i);
  expect(sizeSelect).toHaveDisplayValue("Small");

})

// "Your Selection" text
test('select Size dropdown displays the user\'s selected value', () => {
  render(<App />);

  const sizeSelect = screen.getByLabelText(/select size/i);

  userEvent.selectOptions(sizeSelect, "medium");
  expect(sizeSelect).toHaveDisplayValue('Medium');
  userEvent.selectOptions(sizeSelect, "large");
  expect(sizeSelect).toHaveDisplayValue('Large');

})

// "Contact Info" text box
test("'Your Selection' message initially displays 'small cheese'", ()=>{
  render(<App />);

  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
})

// Submit Order button
test("selecting options updates the 'Your selection' message", ()=>{
  render(<App />);

  const pepperoniInput = screen.getByLabelText(/pepperoni/i);
  const sizeSelect = screen.getByLabelText(/select size/i);

  userEvent.click(pepperoniInput);
  userEvent.selectOptions(sizeSelect, "medium");

  expect(screen.getByText(/medium pepperoni/i)).toBeInTheDocument();

})
