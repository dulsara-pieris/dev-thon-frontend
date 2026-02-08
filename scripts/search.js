const videosContainer = document.querySelector(".videos");

const fallbackPosts = [
	{
		url: 1,
		title: "Sample Video 1",
		thumbnail: "https://unsplash.it/250/150?gravity=center",
		channel_icon: "https://unsplash.it/36/36?gravity=center",
		channel_name: "Test Channel",
		views: "10K",
		uploaded: "2 days ago",
		duration: "5:12",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorum ab voluptatem blanditiis esse iusto quaerat? At veritatis hic inventore ratione excepturi sint consequuntur dolorum nobis, recusandae quisquam earum tenetur."
	},
	{
		url: 2,
		title: "Sample Video 2",
		thumbnail: "https://unsplash.it/250/150?gravity=center",
		channel_icon: "https://unsplash.it/36/36?gravity=center",
		channel_name: "Demo Channel",
		views: "23K",
		uploaded: "1 week ago",
		duration: "12:45",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorum ab voluptatem blanditiis esse iusto quaerat? At veritatis hic inventore ratione excepturi sint consequuntur dolorum nobis, recusandae quisquam earum tenetur."
	},
	{
		url: 3,
		title: "Sample Video 3",
		thumbnail: "https://unsplash.it/250/150?gravity=center",
		channel_icon: "https://unsplash.it/36/36?gravity=center",
		channel_name: "Example Channel",
		views: "5K",
		uploaded: "3 weeks ago",
		duration: "8:30",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorum ab voluptatem blanditiis esse iusto quaerat? At veritatis hic inventore ratione excepturi sint consequuntur dolorum nobis, recusandae quisquam earum tenetur."
	}
];

function createVideoCard(post) {
	const article = document.createElement("article");
	article.className = "video-container";

	article.innerHTML = `
                <a href="${post.url}" class="thumbnail" data-duration="${post.duration}">
                        <img src="${post.thumbnail}" class="thumbnail-image" alt="${post.title}">
                </a>
                <div class="video-bottom-section">
                        <a href="${post.creator}">
                                <img src="${post.channel_icon}" alt="" class="channel-icon">
                        </a>
                        <div class="video-details">
                                <span lass="video-title">${post.title}</span>
                                <a href="${post.creator}" class="video-channel-name">${post.channel_name}</a>
                                <div class="video-metadata">
                                        <span>${post.views} views</span> · 
                                        <span>${post.uploaded}</span>
                                        <p>${post.description}</p>
                                </div>
                        </div>
                </div>
        `;

	return article;
}

async function loadVideos() {
	try {
		const res = await fetch("http://localhost:5000/api/posts");
		if (!res.ok) throw new Error("Backend error");
		const posts = await res.json();
		renderVideos(posts);
	} catch (err) {
		console.warn("Backend not available, using fallback data:", err);
		renderVideos(fallbackPosts);
	}
}

function renderVideos(posts) {
	videosContainer.innerHTML = "";
	const section = document.createElement("section");
	section.className = "videos-section";

	posts.forEach((post) => {
		const videoCard = createVideoCard(post);
		section.appendChild(videoCard);
	});

	videosContainer.appendChild(section);
}
loadVideos();
