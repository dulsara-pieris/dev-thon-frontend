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

const videosContainer = document.querySelector('.videos');

const fallbackPosts = [
        {
                id: 1,
                title: "Sample Video 1",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Test Channel",
                views: "10K",
                uploaded: "2 days ago",
                duration: "5:12"
        },
        {
                id: 2,
                title: "Sample Video 2",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Demo Channel",
                views: "23K",
                uploaded: "1 week ago",
                duration: "12:45"
        },
        {
                id: 3,
                title: "Sample Video 3",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Example Channel",
                views: "5K",
                uploaded: "3 weeks ago",
                duration: "8:30"
        }
];

function createVideoCard(post) {
        const article = document.createElement('article');
        article.className = 'video-container';

        article.innerHTML = `
                <a href="/skill/${post.id}" class="thumbnail" data-duration="${post.duration}">
                        <img src="${post.thumbnail}" class="thumbnail-image" alt="${post.title}">
                </a>
                <div class="video-bottom-section">
                        <a href="#">
                                <img src="${post.channel_icon}" alt="" class="channel-icon">
                        </a>
                        <div class="video-details">
                                <a href="/skill/${post.id}" class="video-title">${post.title}</a>
                                <a href="#" class="video-channel-name">${post.channel_name}</a>
                                <div class="video-metadata">
                                        <span>${post.views} views</span> · 
                                        <span>${post.uploaded}</span>
                                </div>
                        </div>
                </div>
        `;

        return article;
}

async function loadVideos() {
        try {
                const res = await fetch('http://localhost:5000/api/posts');
                if (!res.ok) throw new Error('Backend error');
                const posts = await res.json();
                renderVideos(posts);
        } catch (err) {
                console.warn('Backend not available, using fallback data:', err);
                renderVideos(fallbackPosts);
        }
}

function renderVideos(posts) {
        videosContainer.innerHTML = '';
        const section = document.createElement('section');
        section.className = 'videos-section';

        posts.forEach(post => {
                const videoCard = createVideoCard(post);
                section.appendChild(videoCard);
        });

        videosContainer.appendChild(section);
}
loadVideos();
