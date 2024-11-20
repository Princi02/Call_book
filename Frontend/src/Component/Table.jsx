import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Table({ deleteUser, updateUser }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/getusers", {
          params: {page: currentPage, limit:itemsPerPage},
        });
        
        setData(response.data.data);
        setTotalItems(response.data.totalCount);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentPage]);

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleUpdate = (userId) => {
    updateUser(userId);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };


  const filteredData = data.filter((elem) =>
    Object.values(elem).some((value) =>
      value.toString().toLowerCase().includes(searchQuery)
    )
  ); 

  const totalPages = Math.ceil(totalItems / itemsPerPage);
 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container my-4">
        <div className="card shadow">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Contacts</h2>
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addEmployeeModal"
            >
              <i className="bi bi-plus-circle"></i> Add New Contact
            </button>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone 1</th>
                  <th>Phone 2</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((elem) => (
                <tr key={elem.id}>
                  <td>
                    {[elem.first_name, elem.middle_name, elem.last_name]
                      .filter(Boolean)
                      .join(" ")}
                  </td>
                  <td>{elem.email}</td>
                  <td>{elem.phone_1}</td>
                  <td>{elem.phone_2}</td>
                  <td>{elem.address}</td>
                  <td>
                   <button
                        className="btn btn-sm btn-primary me-2 d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#editEmployeeModal"
                        onClick={() => handleUpdate(elem.id)}
                      >
                        <i className="bi bi-pencil me-1"></i> Update
                   </button>
                   <button
                        className="btn btn-sm btn-danger d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteEmployeeModal"
                        onClick={() => handleDelete(elem.id)}
                      >
                        <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <nav>
              <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
