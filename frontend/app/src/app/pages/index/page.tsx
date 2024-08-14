"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://host.docker.internal:5000/api/bookings"
        );
        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  if (!bookings) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-6">
        <Link href="/pages/bookings/new">
          <button className="btn btn-primary">Create New Booking</button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{booking.service}</h2>
              <p>
                Doctor: {booking.doctor_name}
                <br />
                Date: {formatDate(booking.date)}
                <br />
                Time: {booking.start_time} - {booking.end_time}
              </p>
              <div className="card-actions justify-end">
                <Link href={`/pages/bookings/${booking.id}`}>
                  <button className="btn btn-primary">Checkout Booking</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
