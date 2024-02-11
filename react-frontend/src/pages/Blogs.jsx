import { json, useLoaderData } from "react-router-dom";
import BlogsList from "../components/BlogsList";

function BlogsPage() {
  const data = useLoaderData();
  return <BlogsList  />;
}

export default BlogsPage;

export async function loader() {
  const credentials = JSON.parse(sessionStorage.getItem("credentials"));
  if (credentials === null)
    throw json(
      { message: "Illegal Access: Please login to view the page." },
      { status: 500 }
    );
  else {
    const response = await fetch("http://localhost:8000/api/blogs", {
      headers: { Authorization: "Bearer " + credentials.token },
    });

    if (!response.ok) {
      throw json({ message: response.statusText }, { status: 500 });
    } else {
      const res = await response.json();
      if (res.error === 1) {
        throw json({ message: res.message }, { status: 500 });
      } else return res.data;
    }
  }
}
