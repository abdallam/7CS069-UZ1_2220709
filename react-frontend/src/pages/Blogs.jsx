import { json, useLoaderData } from "react-router-dom";
import BlogsList from "../components/BlogsList";

function BlogsPage() {
  const data = useLoaderData();
  return <BlogsList blogs={data} />;
}

export default BlogsPage;

export async function loader() {
  const response = await fetch("http://localhost:8000/api/blogs");

  if (!response.ok) {
    throw json({ message: response.statusText }, { status: 500 });
  } else {
    const res = await response.json();
    if (res.error === 1) {
      throw json({ message: res.message }, { status: 500 });
    } else return res.data;
  }
}
