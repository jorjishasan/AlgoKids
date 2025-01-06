export const AlgorithmIcons = {
  sorting: (
    <svg className="w-8 h-8 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M3 4h18M6 8h12M8 12h8M10 16h4M11 20h2"
      />
    </svg>
  ),
  
  pathfinding: (
<svg className="w-8 h-8 mb-4 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 15C7.5 16.378 8.622 17.5 10 17.5H12C12.276 17.5 12.5 17.724 12.5 18C12.5 18.276 12.276 18.5 12 18.5H10C8.07 18.5 6.5 16.93 6.5 15C6.5 13.07 8.07 11.5 10 11.5H14C15.378 11.5 16.5 10.378 16.5 9C16.5 7.622 15.378 6.5 14 6.5H12C11.724 6.5 11.5 6.276 11.5 6C11.5 5.724 11.724 5.5 12 5.5H14C15.93 5.5 17.5 7.07 17.5 9C17.5 10.93 15.93 12.5 14 12.5H10C8.622 12.5 7.5 13.622 7.5 15ZM6.47498 10.0349L6.27698 10.166C6.19298 10.222 6.096 10.25 6 10.25C5.904 10.25 5.80702 10.222 5.72302 10.166L5.52502 10.0349C4.32002 9.23891 2.5 8.037 2.5 6C2.5 4.07 4.07 2.5 6 2.5C7.93 2.5 9.5 4.07 9.5 6C9.5 8.037 7.67998 9.23891 6.47498 10.0349ZM8.5 6C8.5 4.622 7.378 3.5 6 3.5C4.622 3.5 3.5 4.622 3.5 6C3.5 7.464 4.921 8.4369 6 9.1499C7.079 8.4369 8.5 7.464 8.5 6ZM6.00403 5.25H5.98901C5.57701 5.25 5.25098 5.585 5.25098 6C5.25098 6.415 5.592 6.75 6.005 6.75C6.417 6.75 6.75098 6.415 6.75098 6C6.75098 5.585 6.41503 5.25 6.00403 5.25ZM21.5 17.25C21.5 19.287 19.68 20.4889 18.475 21.2849L18.277 21.416C18.193 21.472 18.096 21.5 18 21.5C17.904 21.5 17.807 21.472 17.723 21.416L17.525 21.2849C16.32 20.4889 14.5 19.287 14.5 17.25C14.5 15.32 16.07 13.75 18 13.75C19.93 13.75 21.5 15.32 21.5 17.25ZM20.5 17.25C20.5 15.872 19.378 14.75 18 14.75C16.622 14.75 15.5 15.872 15.5 17.25C15.5 18.714 16.921 19.6869 18 20.3999C19.079 19.6869 20.5 18.714 20.5 17.25ZM18.004 16.5H17.989C17.577 16.5 17.251 16.835 17.251 17.25C17.251 17.665 17.592 18 18.005 18C18.417 18 18.751 17.665 18.751 17.25C18.751 16.835 18.415 16.5 18.004 16.5Z" fill="#A855F7"/>
</svg>
  ),
  
  convexhull: (
    <svg className="w-8 h-8 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="6" cy="6" r="1" stroke="currentColor" />
      <circle cx="18" cy="6" r="1" stroke="currentColor" />
      <circle cx="12" cy="18" r="1" stroke="currentColor" />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M6 6L18 6L12 18L6 6"
      />
    </svg>
  ),
  
  default: (
    <svg className="w-8 h-8 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

export const getIcon = (title) => {
  switch (title.toLowerCase()) {
    case 'sorting visualizer':
      return AlgorithmIcons.sorting;
    case 'pathfinding visualizer':
      return AlgorithmIcons.pathfinding;
    case 'convex hull visualizer':
      return AlgorithmIcons.convexhull;
    default:
      return AlgorithmIcons.default;
  }
}; 