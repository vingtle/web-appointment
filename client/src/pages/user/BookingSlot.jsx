import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./BookingSlot.css";

const BookingSlot = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { treatmentName } = useParams();
  const navigate = useNavigate();

  // Fetch slots from the backend
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `/api/slots?treatment=${treatmentName}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      }
    };

    fetchSlots();
  }, [treatmentName]);

  const handleEventClick = (info) => {
    setSelectedSlot({
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
    });
    // Handle slot selection logic
  };

  const handleConfirmBooking = () => {
    const bookingDetails = {
      treatment: treatmentName,
      slot: {
        start: selectedSlot.start,
        end: selectedSlot.end,
      },
    };

    navigate("/payment", { state: bookingDetails });
  };

  return (
    <div id="booking-slot-container">
      <div>{`Booking slots for ${treatmentName}`}</div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerTollbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={handleEventClick}
      />
      {selectedSlot && (
        <div className="selected-slot">
          <h2>Selected Slot</h2>
          <p>
            <strong>Title:</strong> {selectedSlot.title} <br />
            <strong>Start:</strong> {selectedSlot.start.toLocaleString()} <br />
            <strong>End:</strong> {selectedSlot.end.toLocaleString()}
            {selectedSlot.start.toLocaleString()} -{" "}
            {selectedSlot.end.toLocaleString()}
          </p>
          <button type="button" onClick={handleConfirmBooking}>
            Confirm & Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSlot;
