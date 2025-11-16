let stack = [];
let queue = [];
let linkedList = null;

// Overwriting performance log
let performanceLog = [];

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Utility: Show predicted complexity
function showComplexity(structure, operation) {
  const complexityMap = {
    stack: { insert: "O(1)", delete: "O(1)", search: "O(n)" },
    queue: { insert: "O(1)", delete: "O(1)", search: "O(n)" },
    linkedlist: { insert: "O(1)", delete: "O(n)", search: "O(n)" }
  };
  const complexity = complexityMap[structure][operation];
  document.getElementById("complexity").innerText =
    `Predicted Time Complexity for ${operation}: ${complexity}`;
}

// Utility: Measure actual time
function measureTime(callback) {
  const start = performance.now();
  callback();
  const end = performance.now();
  return (end - start).toFixed(3); // milliseconds
}

// Insert
function insert() {
  const value = document.getElementById("value-input").value;
  const structure = document.getElementById("structure-select").value;
  if (!value) return;

  showComplexity(structure, "insert");

  const duration = measureTime(() => {
    if (structure === "stack") {
      stack.push(value);
      render(stack);
    } else if (structure === "queue") {
      queue.push(value);
      render(queue);
    } else {
      const newNode = new Node(value);
      newNode.next = linkedList;
      linkedList = newNode;
      renderLinkedList();
    }
  });

  logPerformance(structure, "insert", duration);
}

// Delete
function remove() {
  const structure = document.getElementById("structure-select").value;
  showComplexity(structure, "delete");

  const duration = measureTime(() => {
    if (structure === "stack") {
      stack.pop();
      render(stack);
    } else if (structure === "queue") {
      queue.shift();
      render(queue);
    } else {
      if (linkedList) linkedList = linkedList.next;
      renderLinkedList();
    }
  });

  logPerformance(structure, "delete", duration);
}

// Search
function search() {
  const value = document.getElementById("value-input").value;
  const structure = document.getElementById("structure-select").value;
  if (!value) return;

  showComplexity(structure, "search");

  let found = false;
  const duration = measureTime(() => {
    if (structure === "stack") {
      found = stack.includes(value);
    } else if (structure === "queue") {
      found = queue.includes(value);
    } else {
      let curr = linkedList;
      while (curr) {
        if (curr.value === value) {
          found = true;
          break;
        }
        curr = curr.next;
      }
    }
  });

  alert(found ? "Available!" : "Not Available.");
  logPerformance(structure, "search", duration);
}

// Visualization
function render(array) {
  const container = document.getElementById("visualization");
  container.innerHTML = "";
  array.forEach((item, index) => {
    const box = document.createElement("div");
    box.textContent = item;
    box.className = "visual-item";
    container.appendChild(box);

    if (index < array.length - 1) {
      const arrow = document.createElement("span");
      arrow.textContent = "→";
      arrow.className = "arrow";
      container.appendChild(arrow);
    }
  });
}

function renderLinkedList() {
  const container = document.getElementById("visualization");
  container.innerHTML = "";
  let curr = linkedList;
  while (curr) {
    const box = document.createElement("div");
    box.textContent = curr.value;
    box.className = "visual-item";
    container.appendChild(box);

    if (curr.next) {
      const arrow = document.createElement("span");
      arrow.textContent = "→";
      arrow.className = "arrow";
      container.appendChild(arrow);
    }
    curr = curr.next;
  }
}

// Performance Logger
function logPerformance(structure, operation, duration) {
  const inputSize = getInputSize(structure);
  const predicted = getPredictedComplexity(structure, operation);

  performanceLog = [ // overwrite previous log
    {
      structure,
      operation,
      predicted,
      actual: `${duration} ms`,
      inputSize
    }
  ];

  // Fallback to console.log for guaranteed output
  const log = performanceLog[0];
  console.clear();
  console.log(`Performance Log:`);
  console.log(`Structure: ${log.structure}`);
  console.log(`Operation: ${log.operation}`);
  console.log(`Predicted: ${log.predicted}`);
  console.log(`Actual Time: ${log.actual}`);
  console.log(`Input Size: ${log.inputSize}`);
}

// Helpers
function getInputSize(structure) {
  if (structure === "stack") return stack.length;
  if (structure === "queue") return queue.length;
  if (structure === "linkedlist") {
    let count = 0;
    let curr = linkedList;
    while (curr) {
      count++;
      curr = curr.next;
    }
    return count;
  }
  return 0;
}

function getPredictedComplexity(structure, operation) {
  const map = {
    stack: { insert: "O(1)", delete: "O(1)", search: "O(n)" },
    queue: { insert: "O(1)", delete: "O(1)", search: "O(n)" },
    linkedlist: { insert: "O(1)", delete: "O(n)", search: "O(n)" }
  };
  return map[structure][operation];
}