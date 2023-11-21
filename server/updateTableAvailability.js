
import ReservationModel from "./models/Reservation.model.js";
import UserModel from "./models/User.model.js";
import TableModel from "./models/Table.model.js";

export async function updateTableAvailability() {
    try {
      const reservations = await ReservationModel.find({ status: "confirmed" });
  
      for (const reservation of reservations) {
        const startReservation = new Date(reservation.date);
        startReservation.setHours(reservation.time.split(':')[0]);
        startReservation.setMinutes(reservation.time.split(':')[1]);
  
        const durationInMinutes = reservation.duration * 60; // Convert duration to minutes
        const endReservation = new Date(startReservation.getTime() + durationInMinutes * 60000);
  
        // Check if the current time is past the end time of the reservation
        if (new Date() > endReservation) {
          // Update the reservation status or perform any other necessary actions
          reservation.status = "completed";
          await reservation.save();
  
          // Make the assigned table available again
          const table = await TableModel.findById(reservation.assignedTable);
          if (table) {
            table.isAvailable = true;
            await table.save();
  
            console.log(`Table ${table._id} availability updated: true`);
          }
        }
      }
    } catch (error) {
      console.error("Error updating table availability:", error);
    }
  }
  