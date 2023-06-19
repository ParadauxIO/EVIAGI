import { getPlacementSuffix } from "./stringHelper";

const formatDate = (date) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const month = months[date.getMonth()];
    const day = date.getDate();

    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = (hours >= 12) ? "pm" : "am";
    const formattedHours = (hours % 12 === 0) ? 12 : hours % 12;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    
    const formattedDate = `${month} ${day}${getPlacementSuffix(day)} ${year} at ${formattedHours}:${formattedMinutes}${period}`;
    
    return formattedDate;
  }

  export {formatDate}