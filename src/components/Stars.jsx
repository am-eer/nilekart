const Stars = ({ rating }) => {
  return (
    <span
      className="star-rating"
      style={{
        backgroundImage: `linear-gradient(to right, orange ${
          rating * 20
        }%, grey ${rating * 20}%)`,
      }}
    >
      ★★★★★
    </span>
  );
};

export default Stars;
