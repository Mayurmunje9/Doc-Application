import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import '../Css/BookingPage.css'; // Import CSS
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isAvailable, setIsAvailable] = useState(false);

  const getDoctor = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        '/api/auth/doctor/getDoctorById',
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log('Get Doctor error ' + error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);
 // ============ handle availiblity
 const handleAvailability = async () => {
  try {
    dispatch(showLoading());
    const res = await axios.post(
      "/api/auth/user/booking-availbility",
      { doctorId: params.doctorId, date, time },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    if (res.data.success) {
      setIsAvailable(true);
      console.log(isAvailable);
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error);
  }
};
  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert("Date & Time Required");
      }

      dispatch(showLoading());
      const formattedDate = moment(date, "DD-MM-YYYY").toISOString();
      const formattedTime = moment(time, "HH:mm").toISOString();

      const res = await axios.post(
        "/api/auth/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: formattedDate,
          time: formattedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctor && (
          <div>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : {doctor.fessPerConsultation}</h4>
            <h4>
              Timings: From {doctor.timings?.from} To {doctor.timings?.to}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
            
                onChange={(value) => { 
                   setDate(value.format("DD-MM-YYYY"))}}
              />
              <TimePicker
                format="HH:mm"
                className="mt-3"
                onChange={(value) =>{ 
                  setTime(value.format("HH:mm"))}}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
               <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
             
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
