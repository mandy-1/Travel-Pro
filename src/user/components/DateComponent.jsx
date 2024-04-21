import React from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArrivaltime, setDeparturetime } from "../../Redux/actions/productAction";

export default function DateComponent() {
  const dispatch = useDispatch();
  const { arrivalTime, departureTime } = useSelector((state) => state.time);
  const [departureDate, setDepartureDate] = useState(new Date().getTime());
  const [returnDate, setReturnDate] = useState(new Date().getTime());

  const handleDepartureDate = (event) => {
    dispatch(setDeparturetime(new Date(event.target.value).getTime()));

    console.log(new Date(event.target.value).getTime());
  };

  const handleReturnDate = (event) => {
    dispatch(setArrivaltime(new Date(event.target.value).getTime()));
  }

  return (
    <Grid container fullWidth spacing={2} mt={2} display={"flex"} justifyContent={"center"}>
      <Grid item xs={10} sm={6}>
        <TextField
          fullWidth
          id="datetime-local"
          label="Departure Date and Time"
          type="datetime-local"
          defaultValue={new Date().getTime()}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDepartureDate}
        />
      </Grid>
      <Grid item xs={10} sm={6}>
        <TextField
          fullWidth
          id="datetime-local"
          label="Return Date and Time"
          type="datetime-local"
          defaultValue={new Date().getTime()}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleReturnDate}
        />
      </Grid>
    </Grid>
  );
}
