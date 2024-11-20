import React from 'react';

export default function UpdatedUser({ handleOnSubmit, value, handleChange }) {
    return (
        <div id="editEmployeeModal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleOnSubmit}>
                        <div className="modal-header">
                            <h4 className="modal-title">Update User</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" value={value.first_name || ''} name='first_name' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input type="text" value={value.middle_name || ''} name='middle_name' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" value={value.last_name || ''} name='last_name' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" value={value.email || ''} name='email' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Phone 1</label>
                                <input type="text" value={value.phone_1 || ''} name='phone_1' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Phone 2</label>
                                <input type="text" value={value.phone_2 || ''} name='phone_2' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" value={value.address || ''} name='address' onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                            <input type="submit" className="btn btn-primary" value="Update" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
