const complexityMap = {
  stack: {
    insert: "O(1)",
    delete: "O(1)",
    search: "O(n)"
  },
  queue: {
    insert: "O(1)",
    delete: "O(1)",
    search: "O(n)"
  },
  linkedlist: {
    insert: "O(1)",
    delete: "O(n)",
    search: "O(n)"
  }
};

function showComplexity(structure, operation) {
  const complexity = complexityMap[structure][operation];
  const box = document.getElementById("complexity");
  box.innerText = `Predicted Time Complexity for ${operation}: ${complexity}`;
}