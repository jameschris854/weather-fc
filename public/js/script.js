const textField = document.querySelector(".text-field");
const theme = document.querySelector(".theme");
const toggle = document.querySelector(".theme>i");
let mode = "white";

console.log(textField);

function Submit() {
  DoSubmit();
}
function DoSubmit() {
  document.myform.city.value = textField.innerText;
  return true;
}
textField.onkeypress = function (event) {
  if (event.which == 13) {
    event.preventDefault();
    console.log("hi");
    document.myform.city.value = textField.innerText;
    document.myform.submit();
  }
};

theme.addEventListener("click", () => {
  if (mode == "white") {
    toggle.classList.remove("fa-toggle-off");
    toggle.classList.add("fa-toggle-on");
    theme.style.color = "white";
    document.querySelector(".arrow").style.color = "white";

    document.querySelector("body").style.background = "black";
    document.querySelector("body").style.color = "white";
    document.querySelector(".logo-bg").style.background = "black";

    document.querySelector("footer>div").style.color = "white";
    document.querySelector("footer>div").style.background = "black";
    document.querySelector(".temp").style.color = "white";
    document.querySelector(".city-field").style.color = "white";
    mode = "black";
  } else {
    toggle.classList.add("fa-toggle-off");
    toggle.classList.remove("fa-toggle-on");
    document.querySelector("body").style.background = "";
    document.querySelector("body").style.color = "";
    document.querySelector(".arrow").style.color = "";
    theme.style.color = "";

    document.querySelector(".logo-bg").style.background = "";

    document.querySelector("footer>div").style.color = "";
    document.querySelector("footer>div").style.background = "";
    document.querySelector(".temp").style.color = "";
    document.querySelector(".city-field").style.color = "";
    mode = "white";
  }
});
textField.addEventListener("click", () => {
  textField.textContent = "";
});
