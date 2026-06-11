const Button = ({ children, type = "button", onClick, className, loading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-primary rounded-xl ${className}`}
      disabled={loading}
    >
      {loading ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
};
export default Button;