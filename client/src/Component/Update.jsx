import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/tasks/${id}`);
            const { description, priority, deadline, status  } = response.data;
            setDescription(description);
            setPriority(priority);
            setDeadline(deadline);
            setStatus(status);
        } catch (error) {
            console.error("Error fetching user:", error.message);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        const updatedUser = { description, priority, deadline, status };
        try {
            const response = await axios.patch(`http://localhost:3001/tasks/${id}`, updatedUser);
            console.log(response.data.message);
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    };

    return (
        <form onSubmit={updateUser} style={{display : "grid", placeItems : "center", margin : "20"}}>
            <table>
                <tr>
                    <td><b>Description</b></td>
                    <td>                
                        <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} className="form-control my-4"/>
                    </td>
                </tr>
                <tr>
                    <td><b>Priority</b></td>
                    <td>      
                        <input type="radio" value="High" checked={priority === "High"} onChange={(e) => setPriority(e.target.value)} className="my-2 mx-2"/> High
                        <input type="radio" value="Normal" checked={priority === "Normal"} onChange={(e) => setPriority(e.target.value)} className="my-2 mx-2"/> Normal
                        <input type="radio" value="Low" checked={priority === "Low"} onChange={(e) => setPriority(e.target.value)} className="my-2 mx-2"/> Low
                    </td>
                </tr>
                <tr>
                    <td><b>Deadline</b></td>
                    <td>                
                        <input type="date" value={deadline} onChange={(e) => {setDeadline(e.target.value)}} className="form-control my-4"/>
                    </td>
                </tr>
                <tr>
                    <td><b>Status</b></td>
                    <td>
                        <input type="radio" value="100" checked={status === "100"} onChange={(e) => setStatus(e.target.value)} className="my-2 mx-2"/>100%
                        <input type="radio" value="75" checked={status === "75"} onChange={(e) => setStatus(e.target.value)} className="my-2 mx-2"/>75%
                        <input type="radio" value="50" checked={status === "50"} onChange={(e) => setStatus(e.target.value)} className="my-2 mx-2"/>50%
                        <input type="radio" value="25" checked={status === "25"} onChange={(e) => setStatus(e.target.value)} className="my-2 mx-2"/>25%
                        <input type="radio" value="0" checked={status === "0"} onChange={(e) => setStatus(e.target.value)} className="my-2 mx-2"/>0%
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>                
                        <button className="btn btn-secondary form-control my-4">Update</button>
                    </td>
                </tr>
            </table>
        </form>
    );
}