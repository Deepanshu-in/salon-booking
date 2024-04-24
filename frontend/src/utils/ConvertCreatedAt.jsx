const formatTimestamp = (timestampString) => {
  const timestamp = new Date(timestampString);

  // Step 2: Extract the individual components of the date and time
  const year = timestamp.getFullYear(); // Get the year (e.g., 2024)
  const month = (timestamp.getMonth() + 1).toString().padStart(2, "0"); // Get the month (0-11, so add 1 for January to December)
  const date = timestamp.getDate().toString().padStart(2, "0"); // Get the day of the month (1-31)
  const hours = (((timestamp.getHours() + 11) % 12) + 1)
    .toString()
    .padStart(2, "0"); // Get the hours in 12-hour format (1-12)
  const minutes = timestamp.getMinutes().toString().padStart(2, "0"); // Get the minutes (0-59)
  const seconds = timestamp.getSeconds().toString().padStart(2, "0"); // Get the seconds (0-59)
  const period = timestamp.getHours() < 12 ? "AM" : "PM"; // Get the period (AM or PM)

  // Step 3: Format the components into a readable date and time string
  const formattedDateTime = `${date}/${month}/${year} at ${hours}:${minutes} ${period}`;

  // Step 4: Return the formatted date and time
  return formattedDateTime;
};
export default formatTimestamp;
