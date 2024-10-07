import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Goback from './GoBack';

const StudentRegistration = () => {
    const [student, setStudent] = useState({
        name: '',
        gender: '',
        course: '',
        isQualified: false,
        address: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setStudent({
            ...student,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Debugging: Log the student data
        console.log('Submitting data:', student);

        try {
            const res = await fetch('http://localhost:5030/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const result = await res.json();
            console.log('Response received:', result);
            setMessage('Registration successful!');
            alert('Student Registered successfully!')
            handleCancel();
            navigate('/')

        } catch (err) {
            console.error(err); // Log error to the console
            setMessage(`Registration failed: ${err.message}`);
        }
    };

    const handleCancel = () => {
        setStudent({
            name: '',
            gender: '',
            course: '',
            isQualified: false,
            address: '',
        });
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-6 m-auto">
                    <div className='mt-3'>
                        <Goback />
                    </div>
                    <form onSubmit={handleSubmit} className="border border-4 p-4 rounded mt-4 bg-body-secondary">
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
                                    value={student.name}
                                    onChange={handleChange}
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
                                    checked={student.gender === 'male'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="female" className="ms-2">Female</label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    checked={student.gender === 'female'}
                                    onChange={handleChange}
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
                                    value={student.course}
                                    onChange={handleChange}
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
                                    checked={student.isQualified}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='col-6'></div>

                            {/* Address Input */}
                            <div className="col-4 me-2">
                                <label htmlFor="address" className="form-label">Address:</label>
                            </div>
                            <div className="col-6">
                                <textarea
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={student.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Buttons */}
                            <div className='mt-4'>
                                <button type="submit" className="btn btn-primary mx-3">
                                    Save
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>

                        {/* Message Display */}
                        {message && <div className="mt-3 alert alert-info">{message}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentRegistration;
