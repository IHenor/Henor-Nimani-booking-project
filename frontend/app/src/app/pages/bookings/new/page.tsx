"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingFormData {
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

const NewBooking: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<BookingFormData>({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date).setHours(0, 0, 0, 0);

    if (!formData.service) newErrors.push("Service is required.");
    if (!formData.doctor_name) newErrors.push("Doctor name is required.");
    if (!formData.start_time) newErrors.push("Start time is required.");
    if (!formData.end_time) newErrors.push("End time is required.");
    if (!formData.date) newErrors.push("Date is required.");

    if (selectedDate < today) {
      newErrors.push("The booking date cannot be in the past.");
    }

    if (
      formData.start_time &&
      formData.end_time &&
      formData.start_time >= formData.end_time
    ) {
      newErrors.push("Start time must be before the end time.");
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        "http://host.docker.internal:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        router.push("/pages/index");
      } else {
        setErrors(["Couldn't create booking"]);
      }
    } catch (error) {
      setErrors(["Couldn't create booking"]);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="hero-content flex-col lg:flex-row-reverse flex-grow">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {/* Form Controls */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service</span>
              </label>
              <input
                type="text"
                name="service"
                placeholder="Service name"
                className="input input-bordered"
                value={formData.service}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Doctor Name</span>
              </label>
              <input
                type="text"
                name="doctor_name"
                placeholder="Doctor's name"
                className="input input-bordered"
                value={formData.doctor_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Time</span>
              </label>
              <input
                type="time"
                name="start_time"
                className="input input-bordered"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">End Time</span>
              </label>
              <input
                type="time"
                name="end_time"
                className="input input-bordered"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Create Booking
              </button>
            </div>
            {errors.length > 0 && (
              <div className="alert alert-error mt-4">
                <div className="flex-1">
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
