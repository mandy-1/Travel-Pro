import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./home.scss"
import { Box, Button, Grid, Typography } from "@mui/material";
import SimpleSelectMenu from "../../components/SimpleSelectMenu";
import TravelersSelectMenu from "../../components/TravelersSelectMenu";
import BagsSelectMenu from "../../components/BagsSelectMenu";
import { db } from '../../../admin/firebase-config';
import { addDoc, arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from '@firebase/firestore';
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { userColumns, userRows } from "../../../admin/datatablesource";
import DateComponent from '../../components/DateComponent';
import { useDispatch, useSelector } from 'react-redux';
import { updateSeatCount } from '../../../Redux/actions/productAction';
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
    const [data, setData] = useState([])
    const [type, setType] = useState("");
    const [category, setCategory] = useState("economy");
    const [bookings, setBookings] = useState([])

    const { arrivalTime, departureTime } = useSelector((state) => state.time);
    const { seats } = useSelector((state) => state.details);
    const dispatch = useDispatch();

    const usersCollectionRef = collection(db, "flights")

    const { user } = useAuth0();

    useEffect(() => {
        const getBookings = async () => {
            const bookingsRef = collection(db, "bookings");

            const booking = await getDocs(bookingsRef);
            setBookings(booking.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }

        getBookings();

        const getFlightDetails = async () => {
            const data = await getDocs(usersCollectionRef);
            setData(data?.docs?.map(doc => ({ ...doc.data(), id: doc.id })))
        }

        getFlightDetails();
    }, [])

    const compareDates = (t1, t2, ignoreTime = true)/*: number*/ => {
        const MS_PER_HOUR = 60 * 60 * 1000;
        const a = new Date(t1);
        const b = new Date(t2);
        const diffInMs = a.getTime() - b.getTime();
        return Math.round(diffInMs / MS_PER_HOUR);
    };

    const handleClick = async () => {
        var result = [];
        const ref = collection(db, "flights");

        if (compareDates(arrivalTime, departureTime) <= 0) {
            const q = query(ref, where("seats", "<=", seats));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let obj = Object.assign(doc.data(), { id: doc.id });
                result.push(obj);
            });
        } else {
            const q = query(ref, where("departure", ">=", departureTime));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                let obj = Object.assign(doc.data(), { id: doc.id });

                if (doc.data().arrival <= arrivalTime && seats <= doc.data().seats) {
                    result.push(obj);
                }
            });
        }

        setData(result);
    };

    useEffect(() => {

    }, [])

    const bookTicket = async (params) => {
        const id = params?.row?.id;

        const flightDoc = doc(db, "flights", id);
        const newFields = { seats: params?.row?.seats - 1 };
        await updateDoc(flightDoc, newFields);

        const bookingsRef = collection(db, "bookings");
        const arr = bookings.filter((el) => el?.email === user?.email)

        console.log('bookings', user?.email, Object.keys(arr).length);

        if (Object.keys(arr).length > 0) {
            const bookingDoc = doc(db, "bookings", arr[0].id);
            const temp = [...arr[0].bookings, params?.row?.id];
            const newFields = { bookings: temp };
            await updateDoc(bookingDoc, newFields);
        } else {
            await addDoc(bookingsRef, {
                email: user?.email,
                bookings: [params?.row?.id]
            })
        }
    };

    const statusColumn = [
        {
            field: "status",
            headerName: "status",
            width: 80,
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flex: 1 }}>
                        <button
                            onClick={() => bookTicket(params)}
                            style={{
                                backgroundColor: 'blueviolet',
                                padding: "5px 10px",
                                color: "white",
                                border: "0px",
                                cursor: "pointer"
                            }}>Book</button>
                    </div>
                );
            },
        }
    ];

    return (
        <div className='home'>
            <Navbar />
            <div className='main'>
                <h1>Where would you like to go?</h1>
                <div className="filters">
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            marginTop: "20px",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <SimpleSelectMenu
                                    options={["One-way", "Round-trip", "Multi-city", "Trip Builder"]}
                                    label={"Flights"}
                                    // onClickHandle={() => updateSearch(param)}
                                    setType={setType}
                                    type={type}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <input type="number" name="Adults" className="adults" value={seats} onChange={(e) => dispatch(updateSeatCount(e.target.value))} />
                                {/* <TravelersSelectMenu
                                options={[
                                    ["Adults", "18-64"],
                                    ["Students", "over 18"],
                                    ["Seniors", "65+"],
                                    ["Youths", "12-17"],
                                    ["Children", "2-11"],
                                    ["Toddler in own seat", "under 2"],
                                    ["Infant in lap", "under 2"],
                                ]}
                                label={"Travelers"}

                            // onClickHandle={() => updateSearch(param, state)}
                            /> */}
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <SimpleSelectMenu
                                    options={["Economy", "Premium Economy", "Business", "First", "Multiple"]}
                                    label={"Class"}
                                    setCategory={setCategory}
                                    category={category}
                                // onClickHandle={() => updateSearch(param, state)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <BagsSelectMenu options={["Carry-on", "Checked"]} label={"Bags"}
                                // handleClick={() => updateSearch(param, state)} 
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Grid spacing={2} mt={2}>
                    <DateComponent />
                </Grid>
                <div className="search">
                    <Grid justifyContent="center" alignItems="center">
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} fullWidth>
                            <Button
                                fullWidth
                                maxWidth={"600px"}
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => handleClick()}
                                sx={{
                                    background: "linear-gradient(135deg,#ff690f 0%,#e8381b 100%)",
                                }}
                                startIcon={<SearchIcon />}
                            >
                                Search
                            </Button>
                        </Box>
                    </Grid>
                </div>
                <div className="results">
                    <div className="datatable">
                        <DataGrid
                            className="datagrid"
                            rows={data}
                            columns={userColumns?.concat(statusColumn)}
                            pageSize={9}
                            rowsPerPageOptions={[9]}
                            checkboxSelection
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home