function urgencyFilter(nodeList, order) {
  return nodeList.map((node) => {
    node.style.order = order * node.dataset.urgency;
    return node;
  });
}

function categoryFilter(nodeList, requiredCategory) {
  return nodeList.filter((node) => node.dataset.category == requiredCategory);
}

export default {
  urgencyFilter,
  categoryFilter,
};
