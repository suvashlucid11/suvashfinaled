import React, { useState, useEffect } from "react";
import axios from "axios";
import Vehicle from "../component/Vehicle";
import Error from "../component/Error";
import "antd/dist/reset.css";
import { DatePicker } from "antd";
import moment from "moment";

function Caterine() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [duplicateVehicles, setDuplicateVehicles] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/gettallvehicles", {
          cancelToken: source.token,
        });
        const data = response.data;

        setVehicles(data);
        setDuplicateVehicles(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [fromDate, toDate, searchKey, type]);

  function filterVehicles() {
    let filteredVehicles = [...duplicateVehicles];

    if (fromDate && toDate) {
      filteredVehicles = filteredVehicles.filter((vehicle) => {
        let isAvailable = true;

        for (const booking of vehicle.currentbookings) {
          const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.todate, "DD-MM-YYYY");

          if (
            moment(fromDate, "DD-MM-YYYY").isBetween(
              bookingFromDate,
              bookingToDate,
              undefined,
              "[]"
            ) ||
            moment(toDate, "DD-MM-YYYY").isBetween(
              bookingFromDate,
              bookingToDate,
              undefined,
              "[]"
            ) ||
            moment(bookingFromDate).isBetween(
              fromDate,
              toDate,
              undefined,
              "[]"
            ) ||
            moment(bookingToDate).isBetween(fromDate, toDate, undefined, "[]")
          ) {
            isAvailable = false;
            break;
          }
        }

        return isAvailable;
      });
    }

    if (searchKey) {
      filteredVehicles = filteredVehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (type !== "all") {
      filteredVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.type.toLowerCase() === type.toLowerCase()
      );
    }

    setVehicles(filteredVehicles);
  }

  function handleFromDateChange(date, dateString) {
    setFromDate(dateString);
  }

  function handleToDateChange(date, dateString) {
    setToDate(dateString);
  }

  function handleSearchChange(e) {
    setSearchKey(e.target.value);
  }

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-3">
          <DatePicker format="DD-MM-YYYY" onChange={handleFromDateChange} />
          <DatePicker format="DD-MM-YYYY" onChange={handleToDateChange} />
          <button onClick={filterVehicles}>Apply</button>
        </div>
        <div className="col-mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search vehicles"
            value={searchKey}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="all">All</option>
            <option value="car">Car</option>
            <option value="bike">bike</option>
            <option value="scooter">Scooter</option>
            <option value="gearcycle">Gear Cycle</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="">
          {fromDate && toDate && (
            <p>
              Selected Dates: {fromDate} to {toDate}
            </p>
          )}
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {error ? (
          <Error message="Error fetching data" />
        ) : (
          vehicles.map((vehicle) => (
            <div className="col-md-9 mt-3" key={vehicle._id}>
              <Vehicle vehicle={vehicle} fromdate={fromDate} todate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Caterine;
