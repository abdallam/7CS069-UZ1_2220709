import { json, useLoaderData } from "react-router-dom";
import BlogsList from '../components/BlogsList';

function BlogsPage() {
  const res = JSON.parse(useLoaderData());
  //  console.log(res.data[0]['body_text']);
  return (
    // <h1>Blogs page {res.data[0]['body_text']}</h1>;
    <BlogsList blogs={res.data} />
  );
}

export default BlogsPage;

export async function loader() {
  const response = await fetch("http://localhost:8000/api/blogs");
  if (!response.ok) {
    throw json({ message: "Cound not load blogs" }, { status: 500 });
  } else {
    const res = await response;
    return res;
  }
}
