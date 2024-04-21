import React, { useEffect, useState } from 'react'
import "./bookings.scss"
import Sidebar from '../../../components/sidebar/Sidebar'
import Datatable from '../../../components/datatable/Datatable'
import Navbar from '../../../components/navbar/Navbar'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../../../firebase-config'
import { DataGrid } from '@mui/x-data-grid'
import { ticketColumns } from '../../../ticketTable'

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const getBookings = async () => {
            const bookingsRef = collection(db, "bookings");

            const booking = await getDocs(bookingsRef);

            setBookings(booking.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }

        getBookings();

        const usersCollectionRef = collection(db, "flights")

        const getFlightDetails = async () => {
            const data = await getDocs(usersCollectionRef);
            setData(data?.docs?.map(doc => ({ ...doc.data(), id: doc.id })))
        }

        getFlightDetails();
    }, [])

    function bookedTickets() {
        // data.forEach(e => {
        const allTickets = [];

        bookings.forEach(ticket => {
            ticket?.bookings.forEach(booking => {
                const temp = Object.assign(ticket, { flightId: booking });
                allTickets.push(temp);
            });
        });

        return allTickets;
    }

    return (
        < div className="tickets" >
            <Sidebar />
            <div className="ticketContainer">
                <Navbar />
                <DataGrid
                    className="datagrid"
                    rows={bookedTickets()}
                    columns={ticketColumns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </div >
    )
}

export default Bookings