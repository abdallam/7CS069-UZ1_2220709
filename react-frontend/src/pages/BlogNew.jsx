import { json, redirect } from "react-router-dom";
import BlogForm from "../components/BlogForm";

function BlogNewPage() {
  return <BlogForm method={"post"} />;
}

export default BlogNewPage;

export async function action({ request, params }) {
  //console.log(data.getAll('title'));
  const data = Object.fromEntries(await request.formData());

 
  //   const blogData = { title: data.get("title"),body: data.get("body"),photo: data.get("image") };
     const send =JSON.stringify(data);
     console.log(send);
  //multipart/form-data

  const response = await fetch("http://localhost:8000/api/blogs/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: send,
  });

  const res = await response.json();

  if (res.error === 1) {
    console.log(res.data);
    return response;
  } else return redirect("/blogs");
}
