const videosContainer = document.querySelector(".sidebar");

const fallbackPosts = [
    {
        url: 1,
        title: "Sample Video 1",
        thumbnail: "https://unsplash.it/250/150?gravity=center",
        channel_name: "Example Channel",
        views: "5K",
        duration: "8:30"
    },
    {
        url: 2,
        title: "Sample Video 2",
        thumbnail: "https://unsplash.it/250/150?gravity=center",
        channel_name: "Example Channel",
        views: "12K",
        duration: "10:20"
    },
    {
        url: 3,
        title: "Sample Video 3",
        thumbnail: "https://unsplash.it/250/150?gravity=center",
        channel_name: "Example Channel",
        views: "8K",
        duration: "5:45"
    }
];

function createVideoCard(post) {
    const article = document.createElement("div");
    article.className = "video-container-play";

    article.innerHTML = `
        <img src="${post.thumbnail}" />
        <div>
            <div class="video-container-title-play">${post.title}</div>
            <div class="video-container-meta-play">${post.channel_name}</div>
            <div class="video-container-meta-play">${post.views} views</div>
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
    posts.forEach((post) => {
        const videoCard = createVideoCard(post);
        videosContainer.appendChild(videoCard);
    });
}

loadVideos();
