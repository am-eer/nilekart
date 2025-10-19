import { Link } from "react-router";

const CategoryButton = ({ categorySlug }) => {
  return (
    <Link to={`categories/${categorySlug}/1`}>
      <button className="category-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11 4l3 8l-3 8"/></svg>
      </button>
    </Link>
  );
}

export default CategoryButton;