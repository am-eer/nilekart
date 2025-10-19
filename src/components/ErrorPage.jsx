import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <p style={{ margin: "1rem" }}>Oh no! Something went wrong! Click <Link to="/" style={{ fontWeight: "700" }}>here</Link> to go back to home page.</p>
  );
};

export default ErrorPage;