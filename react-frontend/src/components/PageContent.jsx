function PageContent({ title, children }) {
    return (
      <div className="row alert" >
        <h1 className="text-danger">{title}</h1>
        {children}
      </div>
    );
  }
  
  export default PageContent;
  