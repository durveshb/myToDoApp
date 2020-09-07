export default function getTodoFeatures(urgencybit, categorybit) {
  const features = document.createElement("div");
  features.classList.add("todo__features");
  
  const urgency = document.createElement("img");
  urgency.classList.add("todo__featureImg");
  urgency.src = "./images/urgency/" + urgencybit + ".svg";
  
  const category = document.createElement("img");
  category.classList.add("todo__featureImg");
  category.src = "./images/category/" + categorybit + ".svg";
  
  features.append(urgency, category);
  return features;
}
