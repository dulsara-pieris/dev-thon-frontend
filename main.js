const slider = document.getElementById("slide-con");
const links = document.querySelectorAll("a[data-target]");

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-target");

    if (target === "login") {
      slider.style.transform = "translateX(-100vw)";
    } else if (target === "signup") {
      slider.style.transform = "translateX(0)";
    }
  });
});
