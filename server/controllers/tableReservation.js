// Get all reservations
export const getAllReservations = async (req, res) => {
    res.json("getAllReservations route");
  };
  
  // Get a specific reservation by ID
  export const getReservationById = async (req, res) => {
    res.json("getReservationById route");
  };
  
  // Create a new reservation
  
 


  import ReservationModel from "../models/Reservation.model.js";
import UserModel from "../models/User.model.js";

// export async function createReservation(req, res) {
//   try {
//     const { date, time, numberOfGuests, specialRequests, duration,username } = req.body;
   

//     // Find user by username
//     // Find user by username
//     const user = await UserModel.findOne({ username });
//     if (!user) {
//       return res.status(401).send({ error: "Invalid username or password" });
//     }


//     // Create reservation
//     const reservation = new ReservationModel({
//       user: user._id,
//       date,
//       time,
//       numberOfGuests,
//       specialRequests,
//       duration,
//     });

//     // Save reservation to the database
//     await reservation.save();

//     const userDetails = {
//       username: user.username,
//       email: user.email,
//       mobile: user.mobile,
//     };

//     return res.status(201).send({
//       message: "Reservation created successfully",
//       reservation,
//       user: userDetails
    
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ error: "Internal server error" });
//   }
// }


  // Update an existing reservation
  export const updateReservation = async (req, res) => {
    res.json("updateReservation route");
  };
  
  // Delete a reservation
  export const deleteReservation = async (req, res) => {
    res.json("deleteReservation route");
  };
  
  // Get availability of tables for a specific date and time
  export const getTableAvailability = async (req, res) => {
    res.json("getTableAvailability route");
  };
  
  // Get guest details by ID
  export const getGuestDetails = async (req, res) => {
    res.json("getGuestDetails route");
  };
  
  // Get all reservations for a specific guest
  export const getGuestReservations = async (req, res) => {
    res.json("getGuestReservations route");
  };
  
  // Get a report of all reservations
  export const getReservationReport = async (req, res) => {
    res.json("getReservationReport route");
  };
  