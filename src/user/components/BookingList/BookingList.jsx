import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import { DataGrid } from '@mui/x-data-grid'
import { userColumns } from '../../../admin/datatablesource'
import { db } from '../../../admin/firebase-config'
import { collection, getDocs } from '@firebase/firestore'
import { useAuth0 } from '@auth0/auth0-react'

const BookingList = () => {
    const [bookings, setBookings] = useState([])
    const [data, setData] = useState([])
    const { user } = useAuth0();


    useEffect(() => {
        const getBookings = async () => {
            const bookingsRef = collection(db, "bookings");

            const booking = await getDocs(bookingsRef);
            console.log('clggggg', booking.docs);
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
        const arr = bookings.filter((el) => el?.email === user?.email)

        const namesToDeleteSet = new Set(arr[0]?.bookings);

        const newArr = data.filter((name) => {
            // return those elements not in the namesToDeleteSet

            return namesToDeleteSet.has(name?.id);
        });

        return newArr;
    }

    return (

        <div className="list">
            <div className="listContainer">
                <Navbar />
                <DataGrid
                    className="datagrid"
                    rows={bookedTickets()}
                    columns={userColumns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </div>
        </div>
    )
}

export default BookingList