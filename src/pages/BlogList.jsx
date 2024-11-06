/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxios from "../custom/useAxios";

const BlogList = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current page from the query parameter or default to 1
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const postsPerPage = 3;
  const { response } = useAxios("http://localhost:3000/posts");

  const totalPosts = Array.isArray(response) ? response.length : 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const currentPosts = Array.isArray(response)
    ? response.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      )
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  // Get the posts from the JSON server
  // const [posts, setPosts] = useState([
  //   {
  //     id: "what-is-react",
  //     title: "What is React?",
  //     desc: "React is a JavaScript library for building user interfaces.",
  //     content:
  //       "<h2>Introduction</h2><p>React is a popular JavaScript library for building interactive UIs and complex single-page applications.</p><h3>Features</h3><ul><li>Component-based architecture</li><li>Efficient DOM updates</li><li>Flexibility and extensive ecosystem</li></ul><p>Overall, React makes it simple to build dynamic web applications.</p>",
  //     img: "https://loremflickr.com/1280/720",
  //   },
  // ]);

  // Array.isArray(response) &&
  // digunakana untuk memastikan bahwa response kode adalah sebuah array sebelum melakukan iterasi di atasnya dengan .map

  //jika response adalah array, setiap post dalam response akan di render sebagai elment html
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <section className="row">
        {currentPosts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <Link to={`/posts/${post.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                <img
                  src={post.img}
                  className="card-img-top img-cstm"
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted">{post.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className="d-flex justify-content-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn btn-outline-primary me-2"
        >
          <i className="bi bi-arrow-left"></i> Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn btn-outline-primary"
        >
          Next <i className="bi bi-arrow-right"></i>
        </button>
        <br />
      </div>
      <p>
        {currentPage}/ {totalPages}
      </p>
    </div>
  );
};

export default BlogList;
