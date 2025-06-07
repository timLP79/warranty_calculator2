function calculateDates(event) {
  event.preventDefault(); // Prevent form submission
  const inputDate = document.getElementById('purchaseDate').value;

  // Validate input date
  if (isNaN(inputDate)) {
    document.getElementById('warrantyDetails').innerText = "Please enter a valid date.";
  } else if (inputDate === "") {
    document.getElementById('warrantyDetails').innerText = "Please enter a purchase date.";
    return;
  }

  //Calculate future dates
  const oneYear = new Date(inputDate);
  oneYear.setFullYear(oneYear.getFullYear() + 1);

  const threeYears = new Date(inputDate);
  threeYears.setFullYear(threeYears.getFullYear() + 3);

  const fiveYears = new Date(inputDate);
  fiveYears.setFullYear(fiveYears.getFullYear() + 5);

  const twentyFiveYears = new Date(inputDate);
  twentyFiveYears.setFullYear(twentyFiveYears.getFullYear() + 25);

  //Construct output
  document.getElementById('warrantyDetails').innerHTML = `
    <p>1 Year Warranty: ${oneYear.toDateString()}</p>
    <p>3 Year Warranty: ${threeYears.toDateString()}</p>
    <p>5 Year Warranty: ${fiveYears.toDateString()}</p>
    <p>25 Year Warranty: ${twentyFiveYears.toDateString()}</p>
  `;

}
