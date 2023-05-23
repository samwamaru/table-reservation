import mongoose from "mongoose";

export const ReservationSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    specialRequests: {
      type: String,
    },
  });

export default mongoose.model('Reservation', ReservationSchema);
