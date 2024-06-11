import React from "react";
import { useNavigate } from "react-router-dom";


function Doctor({ doctor }) {
    const navigate=useNavigate()
  return (
    <>
      <div className="card p-2 m-2" style={{cursor:"pointer"}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
          DR. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization: </b>{doctor.specialization}
          </p>
          <p>
            <b>Experience: </b>{doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation: </b>{doctor.fessPerConsultation}
          </p>
          <p>
            <b>Timings: </b>{doctor.timings.from} - {doctor.timings.to}
          </p>
        </div>
      </div>
    </>
  );
}

export default Doctor;
