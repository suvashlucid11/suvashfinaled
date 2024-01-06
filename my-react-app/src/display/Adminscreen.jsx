import React from "react";
import axios from 'axios'
import { Tabs } from "antd";
import Loader from "../component/Loader";
import Error from "../component/Error";
import Swal from 'sweetalert2'


import { useState, useEffect } from "react";
const { TabPane } = Tabs;

function Adminscreen() {
  return (
    <div className="mt-3 ml-3 mr-3 bs" >
      <h1 className="text-center" style={{ fontSize: '30px' }}> <b>Admin Panel</b> </h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Vehicles" key="2">
          <Vehicles />
        </TabPane>
        <TabPane tab="Add Vehicle" key="3">
          <Addvehicle />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>


      </Tabs>

    </div>
  );
}

export default Adminscreen;

//Booking list components










export function Bookings() {
  const [bookings, setbookings] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        const data = response.data;
        setbookings(data);
        setloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false)
        seterror(true)
        // Handle error state or display error message
      }
    };

    fetchData();
  }, []);

  return (

    <div className="row">
      <div className="col-md-12">

        <h1> Bookings</h1>
        {loading && (<Loader />)}



        <table className="table table-bordered table-dark">

          <thead className="bs thead bg-dark" >
            <tr>
              <th> Booking Id </th>
              <th> User Id</th>
              <th>Vehicle </th>
              <th> From</th>
              <th> To</th>
              <th> Status</th>

            </tr>
          </thead>
          <tbody>

            {bookings.length && (bookings.map(booking => {
              return <tr>
                <td> {booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.vehicle}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>

              </tr>


            }))}

          </tbody>
        </table>



      </div>

    </div>



  )

}

//Vehicle list
export function Vehicles() {

  const [vehicles, setvehicles] = useState([])
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/gettallvehicles");
        const data = response.data;
        setvehicles(data);
        setloading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setloading(false)
        seterror(true)
        // Handle error state or display error message
      }
    };

    fetchData();
  }, []);

  return (

    <div className="row">
      <div className="col-md-12">

        <h1> Vehichles</h1>
        {loading && (<Loader />)}



        <table className="table table-bordered table-dark">

          <thead className="bs thead bg-dark" >
            <tr>
              <th> Vehicle Id </th>
              <th> Name</th>
              <th>Type </th>
              <th> Rent per Day</th>
              <th> Mobile Number</th>


            </tr>
          </thead>
          <tbody>

            {vehicles.length && (vehicles.map(vehicle => {
              return <tr>
                <td> {vehicle._id}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.rentperday}</td>
                <td>{vehicle.mobilenumber}</td>


              </tr>


            }))}

          </tbody>
        </table>



      </div>

    </div>



  )

}

//ad user component


export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/getallusers");
        const data = response.data;
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(true);
        // Handle error state or display error message
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//add vehicle component


export function Addvehicle() {
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [rentperday, setRentperday] = useState('');
  const [description, setDescription] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [mileage, setMileage] = useState('');
  const [type, setType] = useState('');
  const [imageurl1, setImageurl1] = useState('');
  const [imageurl2, setImageurl2] = useState('');
  const [imageurl3, setImageurl3] = useState('');


  async function addVehicle() {

    const newvehicle = {
      name,
      rentperday,
      mileage,
      description,
      mobilenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3]


    }
    try {
      setloading(true)
      const result = await (await axios.post('/api/addvehicle', newvehicle)).data
      console.log(result)

      setloading(false)
      Swal.fire(' Congratulations your room has been added sucessfully', 'success').then(result => {


        window.location.href = "/home"




      })
    } catch (error) {


      console.log(error)
      setloading(false)
      Swal.fire('sorry, something went wrong', 'error')

    }


  }

  return (
    <div className="row">
      {loading && <Loader />}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Rent per day"
          value={rentperday}
          onChange={(e) => {
            setRentperday(e.target.value);
          }}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Mileage"
          value={mileage}
          onChange={(e) => {
            setMileage(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Mobile number"
          value={mobilenumber}
          onChange={(e) => {
            setMobilenumber(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 1"
          value={imageurl1}
          onChange={(e) => {
            setImageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 2"
          value={imageurl2}
          onChange={(e) => {
            setImageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image Url 3"
          value={imageurl3}
          onChange={(e) => {
            setImageurl3(e.target.value);
          }}
        />
        <div className="text-right">
          <button className="btn btn-primary mt-2 " onClick={addVehicle}>
            Add Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}


