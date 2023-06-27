import { useState, useEffect, useRef } from "react";
import "./index.css";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  // LoginForm states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedBloglistAppUser",
        JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`${user.name} logged in`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBloglistAppUser");
    setUser(null);
    setMessage("Logged out");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      blogFormRef.current.toggleVisibility();
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Error creating blog");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>{user ? "blogs" : "log in to application"}</h2>

      {message && <Notification message={message}></Notification>}

      {user && (
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      )}

      {user && (
        <>
          <h2>create new</h2>
          <Togglable buttonLabel={"create new note"} ref={blogFormRef}>
            <NewBlogForm handleCreateBlog={handleCreateBlog}></NewBlogForm>
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog currentUser={user} key={blog.id} blog={blog} />
            ))}
        </>
      )}

      {!user && (
        <LoginForm
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        ></LoginForm>
      )}
    </div>
  );
};

export default App;
