import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const StudentEdit = () => {

    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [course, setCourse] = useState("")
    const [isQualified, setIsQualified] = useState("")
    const [address, setAddress] = useState("")

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5030/students/${id}`)
            .then((res) => {
                console.log(res);
                setName(res.data.name);
                setGender(res.data.gender);
                setCourse(res.data.course);
                setIsQualified(res.data.isQualified);
                setAddress(res.data.address);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            gender,
            course,
            isQualified,
            address
        }
        axios.put(`http://localhost:5030/students/${id}`, data)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    };
    return (
        <div className='container'>
            <div className="row">
                <div className="col-6 m-auto">
                    <form onSubmit={handleSubmit} className="border border-4 p-4 rounded mt-4">
                        <h2>Student Registration</h2>
                        <div className="row row-gap-2 py-3">
                            {/* Name Input */}
                            <div className='col-4'>
                                <label htmlFor="name" className="form-label">Name:</label>
                            </div>
                            <div className="col-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Gender Input */}
                            <div className="col-4">
                                <label htmlFor="gender" className="form-label">Gender:</label>
                            </div>
                            <div className='col-6 d-flex'>
                                <label htmlFor="male" className="ms-2">Male</label>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                <label htmlFor="female" className="ms-2">Female</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Course Input */}
                            <div className="col-4">
                                <label htmlFor="course" className="form-label">Course:</label>
                            </div>
                            <div className='col-8'>
                                <select
                                    className="form-select"
                                    id="course"
                                    name="course"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    required
                                >
                                    <option value="">Select Course</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="MCA">MCA</option>
                                    <option value="MBA">MBA</option>
                                </select>
                            </div>

                            {/* Is Qualified Input */}
                            <div className="col-4 form-check">
                                <label className="form-check-label" htmlFor="isQualified">Is Qualified?</label>
                            </div>
                            <div className="col-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isQualified"
                                    name="isQualified"
                                    checked={isQualified}
                                    onChange={(e) => setIsQualified(e.target.checked)}
                                />
                            </div>
                            <div className="col-6"></div>

                            {/* Address Input */}
                            <div className="col-4 me-2">
                                <label htmlFor="address" className="form-label">Address:</label>
                            </div>
                            <div className="col-6">
                                <textarea
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className='mt-4'>
                                <button type="submit" className="btn btn-primary mx-3" >
                                    Update
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentEdit