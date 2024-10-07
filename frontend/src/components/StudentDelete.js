import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const StudentDelete = () => {

    var navigate = useNavigate();
    const { id } = useParams();
    const handleDeleteStudent = () => {
        axios
            .delete(`http://localhost:5030/students/${id}`)
            .then((res) => {
                console.log(res);
                console.log("Book deleted successfully");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="p-4">
            {/* <Goback /> */}
            <h2 className="py-4">Delete Book</h2>
            {/* {loading ? <Spinner /> : ""} */}
            <div className="py-4 border border-2 w-50 d-flex flex-column">
                <div className="d-flex justify-content-center flex-column">
                    <p>Are you sure to delete</p>
                    <button
                        onClick={handleDeleteStudent}
                        className="btn btn-danger w-25 m-auto"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StudentDelete