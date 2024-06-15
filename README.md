# Doctor Appointment Booking Application

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing doctor appointments. It includes features for users, doctors, and administrators.

## Features

### For Users:

- **View Doctors:** Browse through a list of doctors available on the platform.
- **Book Appointments:** Request appointments with any available doctor.
- **Receive Notifications:** Get email notifications for appointment status updates.

### For Doctors:

- **Approve Requests:** Review and approve/reject requests from users to become doctors.
- **Manage Appointments:** Accept or reject appointment requests from users.
- **Receive Notifications:** Get notified via email when a user books or cancels an appointment.

### For Admins:

- **Manage Users:** Control user accounts and permissions.
- **Manage Doctors:** Approve or reject requests from users to become doctors.
- **Monitor Appointments:** Track appointment bookings and manage overall system activity.

## Technologies Used

- **Frontend:** React.js, Redux, HTML/CSS (Bootstrap)
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Email Notifications:** Nodemailer for sending emails

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed locally
- MongoDB database (either locally or cloud-based)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Mayurmunje9/Doc-Application.git
2. Navigate to the project directory:
   ```sh
   cd doc-application

3. Install dependencies for both frontend and backend:
   ```sh
   cd backend
   npm install
   cd afrontend
   npm install

4. Set up environment variables:
   Create a .env file in the backend directory.
   Add the following variables:
      ```sh
         MONGO_URI=your_mongo_connection_string
         port =3000
         NODE_MODE=development
         NODE_ENV=development
         MONGO_URL=
         JWT_SECRET= 
         EMAIL_PASSWORD=[hxyo rxgn qswy cdnu]/your password
         EMAILID=
5. Start the application:
   ```sh
   # In the backend directory
   npx nodemon ./server.js

   # In the frontend directory
   npm start

## USAGE
**1.User Flow**
- -Sign Up / Login: Users can sign up or log in to the system.
- Request to be a Doctor: Users can request to become a doctor.
- View Doctors: Users can view all available doctors on the home page.
- Book Appointments: Users can book appointments with any listed doctor.
- Receive Notifications: Users receive email notifications when doctors approve or reject their appointment requests.

 **2.Doctor Flow**
- Approval: Doctors receive an email notification upon approval by the 
  admin.
- Manage Appointments: Doctors can manage and respond to appointment requests through the system.
 **3.Admin Flow**
- Manage Doctor Requests: Admins can approve or reject requests from users who want to become doctors.
- Manage Users and Doctors: Admins can manage information about users and doctors.
