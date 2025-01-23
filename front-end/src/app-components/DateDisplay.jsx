import React from "react";
import { Text, Heading } from "@chakra-ui/react";

export default function MysticalDate({ dateString }) {
  const convertToRoman = num => {
    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].numeral;
        num -= romanNumerals[i].value;
      }
    }
    return result;
  };

  const formatMysticalDate = dateStr => {
    // Parse the date string "DD/MM/YYYY, HH:mm:ss"
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split("/");
    const [hour, minute] = timePart.split(":");

    // Convert month number to name
    const months = [
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
    const monthName = months[parseInt(month) - 1];

    // Format hour to 12-hour format with am/pm
    const hourNum = parseInt(hour);
    const hour12 = hourNum % 12 || 12;
    const ampm = hourNum >= 12 ? "pm" : "am";

    return `${parseInt(day)}${getDaySuffix(
      parseInt(day)
    )} ${monthName} ${convertToRoman(
      parseInt(year)
    )} ${hour12}.${minute}${ampm}`;
  };

  const getDaySuffix = day => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <Heading textAlign="center" as="h3" fontSize={22} color="black">
      {formatMysticalDate(dateString)}
    </Heading>
  );
}
