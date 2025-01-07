export const sortingAlgorithmConfig = {
  speed: {
    min: 100,
    max: 1000,
    default: 500,
    step: 100
  },
  array: {
    minSize: 2,
    maxSize: Math.floor(window.screen.width/50),
    defaultSize: Math.floor((window.screen.width/50)/2)
  },
  algorithms: [
    "Quick Sort",
    "Bubble Sort",
    "Selection Sort",
    "Merge Sort"
  ]
}; 