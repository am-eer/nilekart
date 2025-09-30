import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <p>Oh no! Something went wrong!<Link to="/"> Click here </Link> to go back to home page.</p>
  );
};

export default ErrorPage;