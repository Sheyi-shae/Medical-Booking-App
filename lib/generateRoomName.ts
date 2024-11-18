// utils/generateRoom.js
export const generateRoomName = (appointmentDate:Date) => {
    const date = new Date(appointmentDate); // Convert appointmentDate to a Date object
    
    // Format date and time as YYYYMMDD-HHMM
    const formattedDate = date.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
    const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, ''); // HHMMSS
    
    // Optionally, add a random string or timestamp to ensure uniqueness
    const uniqueId = Math.random().toString(36).substring(2, 7); // Random string
    
    // Combine to create a unique room name
    const roomName = `room-${formattedDate}-${uniqueId}`;
    
    return roomName;
  };
  