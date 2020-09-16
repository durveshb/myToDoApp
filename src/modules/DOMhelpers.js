export function createElementHelper(nodeName, className = null, innerHTML = null) {
  const node = document.createElement(nodeName);
  if (className) node.className = className;
  if (innerHTML) node.innerHTML = innerHTML;

  return node;
}

export function createClassedInput(type,placeholder,className){
  const node = createElementHelper("input",className);
  node.type = type;
  node.placeholder = placeholder;

  return node;
}

export function createSelectInput(options,values){
  const select = document.createElement("select");
  const selectOptions = options.map((option,index)=>{
    const node = createElementHelper("option", null, option);
    node.value = values[index];

    return node;
  })
  select.append(...selectOptions);
  return select;
}