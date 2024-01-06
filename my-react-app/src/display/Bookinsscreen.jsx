import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import moment from 'moment';
import 'antd/dist/reset.css';
import Vehicle from '../component/Vehicle';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'
function Bookinsscreen() {
  const { fromdate, todate, vid } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [totaldays, setTotalDays] = useState(0);
  const [totalamount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('currentUser')) {
      window.location.href = '/login';
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/gettvehiclesbyeid", { vid });
        setVehicle(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [vid]);

  useEffect(() => {
    if (fromdate && todate) {
      const fromDateFormatted = moment(fromdate, 'DD-MM-YYYY', true);
      const toDateFormatted = moment(todate, 'DD-MM-YYYY', true);

      if (fromDateFormatted.isValid() && toDateFormatted.isValid()) {
        const days = toDateFormatted.diff(fromDateFormatted, 'days');
        setTotalDays(days);
        setTotalAmount(days * (vehicle ? vehicle.rentperday : 0));
      } else {
        setError(true); // Invalid date format
      }
    }
  }, [fromdate, todate, vehicle]);

  async function bookVehicle() {
    const bookingDetails = {
      vehicle,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      const result = await axios.post("/api/bookings/book", bookingDetails);
      console.log("Booking successful:", result.data);
      // Perform further actions upon successful booking
    } catch (error) {
      console.error("Booking failed:", error.message);
      // Handle booking error
    }
  }

  async function onToken(token) {
    console.log(token)
    const bookingDetails = {
      vehicle,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };




    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/book", bookingDetails);
      setLoading(false)
      console.log("Booking successful:", result.data);
      Swal.fire('Congratulations', ' your vehicle booked sucessfully', 'success').then(result => {
        window.location.href = '/profile'
      })
      // Perform further actions upon successful booking
    } catch (error) {
      setLoading(false)
      Swal.fire('congratulations', 'something went wrong', 'error')
      console.error("Booking failed:", error.message);
      // Handle booking error
    }










  }




  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : error || !vehicle ? (
        <Error />
      ) : (
        <div>
          <div className='row justify-content-center mt-5 bs'>
            <div className='col-md-6'>
              <h1>{vehicle.name}</h1>
              <img src={vehicle.imageurls[0]} className="bigimg" alt="Vehicle" />
            </div>
            <div className='col-md-6'>
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <b>
                  <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name} </p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days: {totaldays}</p>
                  <p>Rent Per day: {vehicle.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>


                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency='NPR'
                  stripeKey="pk_test_51NkUTJA4TauPDoK9twCZokcjkvwSmjoGcH0x9ZknUzTqmQYkKGWQOCzztKXJ9X2odEBADVdYOgdpdxkcFCKxT6rk00xi5nRVUx"
                >

                  <button className='btn btn-primary -m-2 ' >Pay Now</button>




                </StripeCheckout>



              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookinsscreen;
