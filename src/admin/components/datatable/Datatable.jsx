import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import "./datatable.scss";
import { db } from '../../firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useAuth0 } from "@auth0/auth0-react";

const Datatable = () => {
  const [data, setData] = useState([]);
  const usersCollectionRef = collection(db, "flights")

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();


  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    getUsers();
  }, [])

  const handleDelete = async (id) => {
    const userDoc = doc(db, "flights", id);
    setData(data.filter((item) => item.id !== id));
    await deleteDoc(userDoc)
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* Add New Flight */}
        <Link to="/admin/flights/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns?.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
