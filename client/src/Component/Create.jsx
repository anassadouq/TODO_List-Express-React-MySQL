import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('');


    const createTask = async (e) => {
        e.preventDefault();
        const taskData = {
            description: description,
            priority: priority,
            deadline: deadline,
            status: status
        };

        console.log(taskData);
        await axios.post('http://localhost:3001/tasks', taskData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(({ data }) => {
            console.log(data);
            navigate('/');
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
            } else if (error.response) {
                console.log(error.response.data.message);
            } else {
                console.log('An unknown error occurred.');
            }
        });
    };

    return (
        <center>
            <form onSubmit={createTask} style={{display : "grid", placeItems : "center", margin : "20"}}>
                <table>
                    <tr>
                        <td><b>Description</b></td>
                        <td><input type="text" name="description" onChange={(e) => setDescription(e.target.value)} className="form-control my-4" placeholder="Description"/></td>
                    </tr>
                    <tr>
                        <td><b>Priority</b></td>
                        <td>
                            <input type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} className="my-4 mx-2" value="High"/>High
                            <input type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} className="my-4 mx-2" value="Normal"/>Normal
                            <input type="radio" name="priority" onChange={(e) => setPriority(e.target.value)} className="my-4 mx-2" value="Low"/>Low
                        </td>
                    </tr>
                    <tr>
                        <td><b>Deadline</b></td>
                        <td><input type="date" name="deadline" onChange={(e) => setDeadline(e.target.value)} className="form-control my-4"/></td>
                    </tr>
                    <tr>
                        <td><b>Status</b></td>
                        <td>
                            <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="my-4 mx-2" value="100"/>100%
                            <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="my-4 mx-2" value="75"/>75%
                            <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="my-4 mx-2" value="50"/>50%
                            <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="my-4 mx-2" value="25"/>25%
                            <input type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="my-4 mx-2" value="0"/>0%
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="form-control btn btn-dark btn-block">Add</button>
                        </td>
                    </tr>
                </table>
            </form>
        </center>
    );
}