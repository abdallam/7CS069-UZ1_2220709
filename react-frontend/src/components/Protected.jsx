import { useState } from "react";

const [auth, setAuth] = useState(false);

getUser();
function getUser() {
  axios
    .get(
      "http://localhost:8000/api/user",
     
      {
        headers: { Authorization: "Bearer " + credentials.token },
      }
    )
    .then((response) => {
      if(response.data===1) setAuth(true);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message, {
        theme: "colored",
      });
    });
}