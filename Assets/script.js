let dT = new Date(); // gets current date and time
// arrays for converting values into a string for the page title
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// get current.x
let current = {
  hour: dT.getHours(),
  day: days[dT.getDay()],
  month: monthNames[dT.getMonth()],
  year: dT.getFullYear(),
};

$(function () {
  let body = $("body");
  let container = body.children().eq(1); // selects the hourBlock's to be parent container
  // prints time blocks for each hour in the business day
  for (let h = 9; h < 18; h++) {
    // converts military time to standard
    let hourBlock = h;
    if (hourBlock > 12) {
      hourBlock = hourBlock - 12 + "PM";
    } else {
      hourBlock = hourBlock + "AM";
    }

    let hourRow = $("<div>");
    container.append(hourRow);
    hourRow.addClass("row time-block past"); // remove .past after test
    let timeBlock = $("<div>");
    hourRow.append(timeBlock);
    timeBlock.addClass("col-2 col-md-1 hour text-center py-3");
    timeBlock.text(hourBlock);
  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function o(nion) {
  console.log(nion);
}
