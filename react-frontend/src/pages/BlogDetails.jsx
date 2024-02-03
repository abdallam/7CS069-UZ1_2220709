import { useParams } from "react-router-dom";

function BlogDetailsPage() {
  const param = useParams();
  return <h1>the details of the blog page {param.blogId}</h1>;
}

export default BlogDetailsPage;
