const openBtn = document.querySelector(".open-user");
const popup = document.querySelector(".user-overlay");
const closeBtn = document.querySelector(".close-user");

openBtn.addEventListener("click", () => {
	popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
	popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
	if (e.target === popup) {
		popup.style.display = "none";
	}
});
