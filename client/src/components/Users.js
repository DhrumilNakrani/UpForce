import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [status, setStatus] = useState("");
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then(result => {
        setUsers(result.data)
      })
      .catch(err => console.log(err))
  }, [])

  const deleteUser = (id) => {
    axios.delete("http://localhost:5000/delete/" + id)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  const updateStatus = (e) => {
    axios
      .put("http://localhost:5000/update/" + e.target.parentElement.parentElement.getAttribute("userid"), { status: e.target.value })
      .then((result) => {
        setStatus(e.target.value);
        navigate('/');
      })
      .catch((err) => console.error(err));
  }
  return (
    <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="row w-50">
            <div className="col">
              <input
                type="text"
                name="search"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="col">
              <button type="button" className="btn btn-dark">Search</button>
            </div>
          </div>
          <div className="col text-end">
            <Link to="/create" className="btn btn-success">
              Add+
            </Link>
          </div>
        </div>
        <table className="table mt-3 table-responsive">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">Profile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user, key) => {
              return (
                <tr key={key} userid={user._id}>
                  <td className="align-middle">{recordsPerPage*(currentPage-1) + (key + 1)}</td>
                  <td className="align-middle">{user.firstName + ' ' + user.lastName}</td>
                  <td className="align-middle">{user.email}</td>
                  <td className="align-middle">{user.gender}</td>
                  <td className="align-middle"><select onChange={updateStatus} defaultValue={user.status}>
                    <option value='Active'>Active</option>
                    <option value='InActive'>InActive</option>
                  </select></td>
                  <td className="align-middle">
                    <img width="50" src="/profile_photo.png" className="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure." />
                  </td>
                  <td className="align-middle">
                    <Link to={`/update/${user._id}`} className="btn btn-success d-inline-block me-2">
                      Update
                    </Link>
                    <button className="btn btn-danger" onClick={(e) => { deleteUser(user._id) }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {users.length > 0 ? <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> : ''}
      </div>
    </div>
  );
}
