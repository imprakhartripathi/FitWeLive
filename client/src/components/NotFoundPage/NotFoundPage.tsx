import { useNavigate } from "react-router-dom";
import "./NotFoundPage.sass";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>Oops! Something Went Wrong</h1>
      <p>The page you’re looking for doesn't exist or has been moved.</p>
      <div className="btn-group">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <button onClick={() => navigate("/")}>Go to Homepage</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
