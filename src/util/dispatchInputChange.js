const dispatchInputChange = (input, state) => {
  const emailInput = document.querySelector(input);
  emailInput.setAttribute("value", state);
  emailInput.dispatchEvent(new Event("change", { bubbles: true }));
  emailInput.dispatchEvent(new Event("blur", { bubbles: true }));
  emailInput.disabled = true;
  return emailInput;
};

export default dispatchInputChange;
