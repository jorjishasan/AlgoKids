const CaretDown = ({ className = "" }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 group-hover:rotate-180 text-green-500 ${className}`}
  >
    <path 
      d="M10.698 15.396L6.3181 10.2019C5.5821 9.3289 6.20603 8 7.35203 8H16.6479C17.7939 8 18.4179 9.3299 17.6819 10.2019L13.302 15.396C12.623 16.201 11.377 16.201 10.698 15.396Z" 
      fill="currentColor"
    />
  </svg>
);

export default CaretDown; 