import { useState, useEffect } from "react";


import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setReservationData } from "../slices/reservationSlice";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { toast } from 'react-toastify';
import { useCreateAppointmentMutation } from "../slices/reservationApiSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";


const CreateReservation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [duration, setDuration] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctortId] = useState("");
  const [reason, setReason] = useState("");

  const [activeSection, setActiveSection] = useState("popular");
  const [showMenuOption, setShowMenuOption] = useState("");

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const today = new Date()

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [createAppointment , {isLoading, isError}] = useCreateAppointmentMutation()

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
console.log("i clicked the button")
    if (!userInfo) {
      

      // Redirect to login page
 navigate("/login");
      return;
    }

    
      const  appointmentData = {
        appointmentDate,
        duration,
        patientId,
        doctorId,
        reason

      };
      try {
  const result = await createAppointment(appointmentData).unwrap();
  toast.success("appointment created successfully")
      }catch (error){
        console.log(error)
      }

   
navigate("/")
      // Reset the form fields
      setAppointmentDate("");
      setDuration("");
      setPatientId("");
    
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleMenuOptionClick = (menuOption) => {
    setShowMenuOption(menuOption);
  };
  const galleryImages = [
    "/images/record.jpg",
    "/images/gall1.jpg",
    "/images/hos.jpg",
    
    // Add more image URLs here
  ];
  const openGallery = (image) => {
    setCurrentImage(image);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const loadMoreImages = () => {
    // Logic to load more images goes here
    console.log("Load more images");
  };

  const scrollToNextImage = () => {
    if (currentImageIndex < galleryImages.length - 1) {
      setCurrentImage(galleryImages[currentImageIndex + 1]);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const scrollToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImage(galleryImages[currentImageIndex - 1]);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const  reservationData = {
  //   date:date,
  //   time: time,
  //   patientId: patientId,
  // };
  const activeColor = "#941C2F";
  function formatTime(time) {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return time.toLocaleTimeString([], options).replace(/^0(\d+)/, "$1");
  }

  return (
    <div className="">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src="images/ehr.jpg"
          alt="Restaurant Image"
          className="w-full h-64 object-cover px-0 mx-0"
        />
      </div>
      <div className="px-4">
        {/* Sticky Menu/Navbar */}
        <nav className="sticky top-0 bg-white shadow-md py-4">
          <ul className="flex space-x-4" style={{ padding: "0 10px" }}>
            <li
              className={`cursor-pointer  ${
                activeSection === "popular" ? "active" : ""
              }`}
              onClick={() => scrollToSection("popular")}
            >
              Services
            </li>
            <li
              className={`cursor-pointer ${
                activeSection === "gallery" ? "active" : ""
              }`}
              onClick={() => scrollToSection("gallery")}
            >
              Gallery
            </li>
           
          </ul>
        </nav>

        <div className="flex flex-wrap mx-auto">
          <div className="w-full lg:w-2/3 pr-4">
          <section id="ehr-project" className="mb-8">
  <h2 className="text-2xl font-bold mb-4 text-blue-200">
    Tophill
  </h2>
  <hr className="mb-4" />

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {/* Card 1 */}
    <div className="popular-card">
      <h3 className="font-bold mb-2">24/7 Access to Health Records</h3>
      <p className="text-gray-600">
        Access and manage health records securely round-the-clock.
      </p>
      <p className="text-gray-400 mt-2">Learn more...</p>
    </div>

    {/* Card 2 */}
    <div className="popular-card">
      <h3 className="font-bold mb-2">Innovative Health Solutions</h3>
      <p className="text-gray-600">
        Explore cutting-edge health technologies to streamline healthcare processes.
      </p>
      <p className="text-gray-400 mt-2">Learn more...</p>
    </div>

    {/* Card 3 */}
    <div className="popular-card">
      <h3 className="font-bold mb-2">Enhanced Patient Care</h3>
      <p className="text-gray-600">
        Elevate patient care and experience through advanced record management systems.
      </p>
      <p className="text-gray-400 mt-2">Learn more...</p>
    </div>

    {/* Add more cards as needed */}
  </div>
</section>


            <section id="gallery" className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((image, index) => (
                  <div className="gallery-item" key={index}>
                    <img
                      src={image}
                      alt="Restaurant"
                      onClick={() => openGallery(image, index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
                {galleryImages.length > 6 && (
                  <div className="gallery-item col-span-3">
                    <button
                      onClick={loadMoreImages}
                      className="p-2 bg-white text-gray-500"
                    >
                      + {galleryImages.length - 6} more pictures
                    </button>
                  </div>
                )}
              </div>
              {galleryOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75">
                  <div className="max-w-2xl mx-auto relative gallery-modal">
                    <span
                      onClick={closeGallery}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-500 cursor-pointer"
                    >
                      <AiOutlineClose />
                    </span>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={scrollToPreviousImage}
                        className="p-2 bg-white rounded-full text-gray-500"
                        disabled={currentImageIndex === 0}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                      <img
                        src={currentImage}
                        alt="Restaurant"
                        className="mx-4"
                      />
                      <button
                        onClick={scrollToNextImage}
                        className="p-2 bg-white rounded-full text-gray-500"
                        disabled={
                          currentImageIndex === galleryImages.length - 1
                        }
                      >
                        <AiOutlineArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

          
          </div>
          {/* Right Section */}
          <div className="w-full lg:w-1/3">
            {/* Reservation Form Modal */}
            <div className="sticky top-0">
              <div className="bg-white rounded-md shadow-md p-6">
                <h1
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#941C2F" }}
                >
                  Book Appointment
                </h1>
                <form onSubmit={handleCreateAppointment}>
                  {/* Date */}
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Date:
                    </label>
                    <DatePicker
                      id="appointmentDate"
                      selected={appointmentDate}
                      onChange={(date) => setAppointmentDate(date)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholderText="Select date"
                      dateFormat="yyyy-MM-dd"
                      minDate={today}
                    />
                  </div>

                  {/* Time */}
                  <div className="mb-4">
                    <label
                      htmlFor="duration"
                      className="block text-gray-700 font-bold mb-2"
                    >
                   Duration
                    </label>
                    <input
                    
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="mb-4">
                    <label
                      htmlFor="PatientId"
                      className="block text-gray-700 font-bold mb-2"
                    >
                     Patient Id
                    </label>
                    <input
                    
                      id="patientId"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Reason"
                      className="block text-gray-700 font-bold mb-2"
                    >
                     Reason
                    </label>
                    <input
                     
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="doctorId"
                      className="block text-gray-700 font-bold mb-2"
                    >
                  Doctor Id
                    </label>
                    <input
                      
                      id="doctorId"
                      value={doctorId}
                      onChange={(e) => setDoctortId(e.target.value)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                  type="submit"
                    // onClick={openModal}
                    className=" text-white rounded-md px-4 py-2"
                    style={{ backgroundColor: "#03191E" }}
                  >
                    Book Appointment 
                  </button>
                </form>
                {/* {isModalOpen && (
                  <ConfirmReservation
                    onClose={closeModal}
                    reservationData= { reservationData}
                    
                   
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReservation;
