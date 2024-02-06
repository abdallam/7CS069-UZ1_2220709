import {  useRouteLoaderData } from "react-router-dom";

import BlogForm from "../components/BlogForm";

function BlogEditPage()
{
    const data = useRouteLoaderData('blog-details');
    return <BlogForm method={'patch'} blog={data}/>; 

}

export default BlogEditPage;