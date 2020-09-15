export function createElementHelper(nodeName, className = null, innerHTML = null) {
  const node = document.createElement(nodeName);
  if (className) node.className = className;
  if (innerHTML) node.innerHTML = innerHTML;

  return node;
}