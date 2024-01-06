import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Divider, Space, Tag } from 'antd';

const { TabPane } = Tabs;

function Profilescreen() {


    const user = JSON.parse(localStorage.getItem("currentUser"))


    useEffect(() => {

        if (!user) {
            window.location.href = "/login"
        }

    }, [])
    return (
        <div className='ml-3,mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name:{user.name}</h1>
                    <h1>Email:{user.email}</h1>
                    <h1>isAdmin:{user.isAdmin ? 'Yes' : 'No'}</h1>




                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>

            </Tabs>
        </div>
    );
}

export default Profilescreen;



export function MyBookings() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [bookings, setbookings] = useState([])
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await (await axios.post('api/bookings/getbookingsbyuserid', { userid: user._id })).data
                setbookings(data)
                setLoading(false)



                // Handle the data here, set it to state or perform further operations
            } catch (error) {


                console.log(error);
                setLoading(false)
                setError(true)
            }
        };

        fetchData();
    }, [user]);

    async function cancelBooking(bookingid, vehicleid) {
        try {
            setLoading(true)
            const result = await axios.post("/api/bookings/cancelbooking", { bookingid, vehicleid }).data
            setLoading(false)
            Swal.fire("Dear user,your booking has been cancelled . ").then(result => {

                window.location.reload()


            })
            console.log(result);

        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire('something went wrong')
        }

    }




    return (
        <div className='row'>
            <div className="colmd-6">

                {loading && (<Loader />)}
                {bookings && (bookings.map(booking => {

                    return (<div className='bs'>


                        <h1> Rented Vehicle:{booking.vehicle} </h1>
                        <p>Rented ID:{booking._id}</p>
                        <h1> Rented In Date:{booking.fromdate}</h1>
                        <h1> Rented Expiration Date:{booking.todate}</h1>
                        <h1>Estimated Rented Days:{booking.totaldays}</h1>
                        <h1>Amount:{booking.totalamount}</h1>
                        <p>
                            <b> Status:


                            </b>:{''}

                            {booking.status == 'canceled' ? (<Tag color="orange">Cancelled</Tag>) : (<Tag bordered={false} color="green">
                                Confirmed
                            </Tag>)}
                        </p>
                        {booking.status !== 'canceled' &&

                            <div className='text-right'>
                                <button className="btn btn-primary" onClick={() => {
                                    cancelBooking(booking._id, booking.vehicleid)
                                }}>
                                    Cancel Booking
                                </button>
                            </div>



                        }




                    </div>
                    )






                }))}



            </div>
        </div >
    )
}


