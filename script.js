// Array to store the number of days in each month (initially considering February has 28 days)
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Function to calculate age based on input date
function ageCalculate() {
    // Get the current date
    let today = new Date();

    // Get the user's input date from the HTML input field
    let inputDate = new Date(document.getElementById("date-input").value);

    // Variables to store calculated birth details (day, month, year)
    let birthMonth, birthDate, birthYear;

    // Object to store birth details separately
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    }

    // Variables to store current date details
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    // Check for leap year and update the number of days in February
    leapChecker(currentYear);

    // Check if the birth date is in the future, and handle accordingly
    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)
    ) {
        alert("Not Born Yet");
        // Display placeholder values and exit the function
        displayResult("-", "-", "-");
        return;
    }

    // Calculate age in years
    birthYear = currentYear - birthDetails.year;

    // Calculate age in months
    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    }
    else {
        // Adjust age if birth month is in the future
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    // Calculate age in days
    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    }
    else {
        // Adjust age if birth date is in the future
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;

        // Check for negative birth month after adjustment
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    // Display the calculated age
    displayResult(birthDate, birthMonth, birthYear);
}

// Function to update HTML elements with calculated age
function displayResult(bDate, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

// Function to check if a year is a leap year and update the number of days in February accordingly
function leapChecker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
        // Leap year, update February to 29 days
        months[1] = 29;
    }
    else {
        // Non-leap year, update February to 28 days
        months[1] = 28;
    }
}
