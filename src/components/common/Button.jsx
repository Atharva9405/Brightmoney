const variants = {
  primary: "bg-primary text-white hover:opacity-90",
  secondary: "bg-grey text-body hover:bg-grey-dark",
  danger: "bg-red text-white hover:bg-red-dark",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`
        rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
