import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

function Comments(comms) {
 
 

  return <div>{ comms.map((comm) => (
    <div className="flex-shrink-1 bg-light rounded  px-3 me-3" key={comm.id}>
      <small className="fw-bold mb-1">
        {" "}
        {comm.user.name} [{comm.user.email}]
      </small>
      <p> {comm.comment}</p>
      <hr />
    </div>
  ))}
  </div>
}

export default Comments;
