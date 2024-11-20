import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser() {
    const [value, setValue] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_1: "",
        phone_2: "",
        address: "",
    });

    const handleOnChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const closeRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const addUser = await axios.post('http://localhost:3000/api/create', value);
            const response = addUser.data;
            if (response.success) {
                toast.success(response.Message);
                closeRef.current.click();
                setValue({
                  first_name: "",
                  middle_name: "",
                  last_name: "",
                  email: "",
                  phone_1: "",
                  phone_2: "",
                  address: "",
                });
            }
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <div id="addEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Add Employee</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true" ref={closeRef}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" value={value.first_name} name='first_name' onChange={handleOnChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" value={value.middle_name} name='middle_name' onChange={handleOnChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" value={value.last_name} name='last_name' onChange={handleOnChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={value.email} name='email' onChange={handleOnChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Phone 1</label>
                                <input type="text" value={value.phone_1} name='phone_1' onChange={handleOnChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label>Phone 2</label>
                                <input type="text" value={value.phone_2} name='phone_2' onChange={handleOnChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" value={value.address} name='address' onChange={handleOnChange} className="form-control" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                            <input type="submit" className="btn btn-success" value="Add" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
