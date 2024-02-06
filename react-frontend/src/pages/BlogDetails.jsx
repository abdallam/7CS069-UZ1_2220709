import { json, useParams, useRouteLoaderData ,redirect } from "react-router-dom";
import BlogItem from "../components/BlogItem";

function BlogDetailsPage() {
  const param = useParams();
  const data = useRouteLoaderData('blog-details');
  return <BlogItem blog={data} />;
}

export default BlogDetailsPage;

export async function loader({ request, params }) {
  const id = params.blogId;
  const response = await fetch("http://localhost:8000/api/blog/" + id, {
    method: "POST",
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

export async function action({ request, params }) {
    
const id= params.blogId;
  console.log(id);

  const response = await fetch("http://localhost:8000/api/blog/delete/"+id, {
    method: "POST",
    // headers:{'Content-Type':'multipart/form-data'},
    // body: formData
  });
  if (!response.ok) {
    throw json({ message: response.statusText }, { status: 500 });
  } else {
    const res = await response.json();
    if (res.error === 1) {
      throw json({ message: res.message }, { status: 500 });
    } else  return redirect('/blogs');
  }
  //fetch()
}
