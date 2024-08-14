"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const BookingDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `http://host.docker.internal:5000/api/bookings/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Booking = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBooking();
  }, [id]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  if (!booking) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-center">Booking Details</h2>
          <p>
            <strong>Service:</strong> {booking.service}
          </p>
          <p>
            <strong>Doctor Name:</strong> {booking.doctor_name}
          </p>
          <p>
            <strong>Start Time:</strong> {booking.start_time}
          </p>
          <p>
            <strong>End Time:</strong> {booking.end_time}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(booking.date)}
          </p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/pages/index")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
