import { useState } from "react";

const NewBlogForm = ({ handleCreateBlog }) => {
  const [newBlogFormData, setNewBlogFormData] = useState({
    title: "",
    author: "",
    url: "",
  });
  const handleChange = (event) => {
    setNewBlogFormData({
      ...newBlogFormData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateBlog(newBlogFormData);
    setNewBlogFormData({
      title: "",
      author: "",
      url: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={newBlogFormData.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogFormData.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogFormData.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
