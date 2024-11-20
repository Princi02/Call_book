import React, { useState, useEffect } from "react";
import Table from "../Component/Table";
import AddUser from "../Component/AddUser";
import UpdatedUser from "../Component/UpdatedUser";
import DeleteUser from "../Component/DeleteUser";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserTable() {
  const [userId, setUserId] = useState();
  const [updatedUserId, setUpdatedUserId] = useState();
  const [value, setValue] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_1: "",
    phone_2: "",
    address: "",
  });
  const [userData, setUserData] = useState(null);

useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/getusers");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const deleteUser = (userId) => {
    setUserId(userId);
  };

  const updateUser = (userId) => {
    setUpdatedUserId(userId);
    const user = userData.find((user) => user.id === userId);
    if (user) {
      setValue(user);
    }
  };

  const handleUserDelete = async () => {
    try {
      const deletedUser = await axios.delete(
        `http://localhost:3000/api/delete/${userId}`
      );
      const response = deletedUser.data;
      if (response.success) {
        toast.success(response.message);  
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await axios.put(
        `http://localhost:3000/api/update/${updatedUserId}`,
        value
      );
      const response = updatedUser.data;

      if (response.success) {
        toast.success(response.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table deleteUser={deleteUser} updateUser={updateUser}></Table>
      <AddUser></AddUser>
      {userData && (
        <UpdatedUser
          handleOnSubmit={handleSubmit}
          value={value} 
          handleChange={handleChange}
        />
      )}
      <DeleteUser handleUserDelete={handleUserDelete}></DeleteUser>
    </>
  );
}


