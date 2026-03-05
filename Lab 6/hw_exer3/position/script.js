const box = document.getElementById("box");
const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  const position = box.getBoundingClientRect();

  // show values on page (and you can also console.log if required)
  output.textContent =
`left:   ${position.left.toFixed(2)}
top:    ${position.top.toFixed(2)}
right:  ${position.right.toFixed(2)}
bottom: ${position.bottom.toFixed(2)}
width:  ${position.width.toFixed(2)}
height: ${position.height.toFixed(2)}`;

  console.log(position.left, position.top);
});