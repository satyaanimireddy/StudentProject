import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [studentData, setStudentData] = useState([])
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [course, setCourse] = useState("")


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    const handleChange = (event) => {
        setName(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Handle the search logic (e.g., API call or filtering)
    //     console.log('Searching for:', { name, gender, course });
    // };

    useEffect(() => {
        fetch("http://localhost:5030/students")
            .then((res) => res.json())
            .then((data) => {
                setStudentData(data)
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const filteredStudents = studentData.filter(student => {
        const matchesName = student.name.toLowerCase().includes(name.toLowerCase());
        const matchesCourse = course ? student.course === course : true;
        const matchesGender = gender ? student.gender === gender : true;
        return matchesName && matchesCourse && matchesGender;
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    // Get current students for the current page
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className='container p-4'>
            <h2 className='text-start text-light'>Search here</h2>
            <form className="col-4 my-4">
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    className="form-control me-2"
                    placeholder="Search by name..."
                    aria-label="Search"
                />

                <div className='my-3'>
                    <select
                        value={course}
                        onChange={handleCourseChange}
                        className="form-select me-2"

                    >
                        <option value="">select course for search</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                    </select>
                </div>
                <select
                    value={gender}
                    onChange={handleGenderChange}
                    className="form-select me-2"
                >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {/* <button type="submit" className="btn btn-primary">
                    Search
                </button> */}
            </form>

            <div className='d-flex justify-content-end'>
                <Link to={'/students/register'}><button className='btn btn-primary m-2'> Register Student </button></Link>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">SlNo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Course</th>
                        <th scope="col">isQualified</th>
                        <th scope="col">address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.length > 0 ? (
                        currentStudents.map((student, index) => (
                            <tr key={student._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{student.name}</td>
                                <td>{student.gender}</td>
                                <td>{student.course}</td>
                                <td>{student.isQualified ? 'Yes' : 'No'}</td>
                                <td>{student.address}</td>
                                <td>
                                    <Link to={`/students/edit/${student._id}`} className='btn btn-warning mx-2'>Edit</Link>
                                    <Link to={`/students/delete/${student._id}`} className='btn btn-danger mx-2'>Delete</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center bg-danger-subtle">No students found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default Home