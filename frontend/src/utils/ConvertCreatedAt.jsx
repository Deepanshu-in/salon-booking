const formatTimestamp = (timestampString) => {
  const timestamp = new Date(timestampString);

  const year = timestamp.getFullYear();
  const month = (timestamp.getMonth() + 1).toString().padStart(2, "0");
  const date = timestamp.getDate().toString().padStart(2, "0");
  const hours = (((timestamp.getHours() + 11) % 12) + 1)
    .toString()
    .padStart(2, "0");
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");
  const period = timestamp.getHours() < 12 ? "AM" : "PM";
  const formattedDateTime = `${date}/${month}/${year} at ${hours}:${minutes} ${period}`;
  return formattedDateTime;
};
export default formatTimestamp;
