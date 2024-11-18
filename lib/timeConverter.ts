export function convertTo12Hour(time:string) {
    // Split the time into hours and minutes
    let [hours, minutes] = time.split(':').map(Number);
    
    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12;  // If hour is 0 (midnight), set it to 12

    // Return the formatted time
    return `${hours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
}


