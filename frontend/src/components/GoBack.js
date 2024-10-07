import React from "react";
import { Link } from "react-router-dom";

function Goback() {
    return (
        <Link to="/">
            <button className="btn btn-primary">Go Back</button>
        </Link>
    );
}

export default Goback;