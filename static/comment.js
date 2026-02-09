const commentSection = document.getElementById("comment-section");
const newCommentInput = document.getElementById("new-comment");
const addCommentBtn = document.getElementById("add-comment-btn");

function createComment(user, text) {
	const commentDiv = document.createElement("div");
	commentDiv.classList.add("comment");
	commentDiv.innerHTML = `
        <p><strong>${user}</strong> ${text}</p>
        <button class="reply-btn">Reply</button>
        <div class="reply-input" style="display:none; margin-top:5px;">
            <input type="text" placeholder="Write a reply...">
            <button class="submit-reply" style="margin-top:5px; padding:4px 8px; cursor:pointer;">Reply</button>
        </div>
        <div class="replies"></div>
    `;

	const replyBtn = commentDiv.querySelector(".reply-btn");
	const replyInputDiv = commentDiv.querySelector(".reply-input");
	replyBtn.addEventListener("click", () => {
		replyInputDiv.style.display =
			replyInputDiv.style.display === "none" ? "block" : "none";
		replyInputDiv.querySelector("input").focus();
	});

	const submitBtn = commentDiv.querySelector(".submit-reply");
	submitBtn.addEventListener("click", () => {
		const input = replyInputDiv.querySelector("input");
		if (input.value.trim() === "") return;
		const replyComment = createComment("You", input.value.trim());
		commentDiv.querySelector(".replies").appendChild(replyComment);
		input.value = "";
		replyInputDiv.style.display = "none";
	});

	return commentDiv;
}

addCommentBtn.addEventListener("click", () => {
	const text = newCommentInput.value.trim();
	if (text === "") return;
	const comment = createComment("You", text);
	commentSection.appendChild(comment);
	newCommentInput.value = "";
});
