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

const videosContainer = document.querySelector(".videos");


const fallbackHistory = [
        {
                url: 1,
                title: "Sample Video 1",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Test Channel",
                watched_at: "2 hours ago",
                progress: 65,
                duration: "5:12"
        },
        {
                url: 2,
                title: "Sample Video 2",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Demo Channel",
                watched_at: "Yesterday",
                progress: 100,
                duration: "12:45"
        }
];


function createHistoryCard(video) {
        const article = document.createElement("article");
        article.className = "video-container history-item";

        article.innerHTML = `
                <a href="${video.url}" class="thumbnail">
                        <img src="${video.thumbnail}" class="thumbnail-image" alt="${video.title}">
                        <div class="history-progress">
                                <div class="history-progress-bar" style="width:${video.progress}%"></div>
                        </div>
                </a>

                <div class="video-bottom-section">
                        <a href="${post.creator}">
                                <img src="${video.channel_icon}" class="channel-icon">
                        </a>

                        <div class="video-details">
                                <span class="video-title">${video.title}</span>
                                <a href="${post.creator}" classclass="video-channel-name">${video.channel_name}</a>

                                <div class="video-metadata">
                                        <span>Watched ${video.watched_at}</span> ·
                                        <span>${video.progress}% watched</span>
                                </div>
                        </div>
                </div>
        `;

        return article;
}


async function loadHistory() {
        try {
                const res = await fetch("http://localhost:5000/api/history");
                if (!res.ok) throw new Error("Backend error");
                const history = await res.json();
                renderHistory(history);
        } catch (err) {
                console.warn("Using fallback history:", err);
                renderHistory(fallbackHistory);
        }
}


function renderHistory(videos) {
        videosContainer.innerHTML = "";

        const section = document.createElement("section");
        section.className = "videos-section history-section";

        videos.forEach(video => {
                section.appendChild(createHistoryCard(video));
        });

        videosContainer.appendChild(section);
}

loadHistory();
