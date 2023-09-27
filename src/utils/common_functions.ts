export const getDayOfTheWeek = (dateString: string) => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "today";
  } else {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeekIndex = inputDate.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }
};

export const isDaytimeFromLocalTime = (
  localTime: string | undefined
): boolean => {
  // Check if localTime is undefined or empty
  if (!localTime || localTime.trim() === "") {
    return false; // Return false if localTime is invalid
  }

  // Split the local time string into date and time parts
  const [datePart, timePart] = localTime.split(" ");

  // Check if there are exactly two parts (date and time)
  if (datePart && timePart) {
    // Split the time part into hours and minutes
    const [hours, minutes] = timePart.split(":").map(Number);

    // Define the hours for day and night (adjust as needed)
    const dayStartHour = 6; // Start of daytime (6 AM)
    const nightStartHour = 18; // Start of nighttime (6 PM)

    // Check if the current hour is between the day and night hours
    return hours >= dayStartHour && hours < nightStartHour;
  }

  return false; // Return false for any other invalid cases
};
