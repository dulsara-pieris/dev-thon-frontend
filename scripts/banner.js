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
                url: 1,
                title: "Sample Video 1",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Test Channel",
                views: "10K",
                uploaded: "2 days ago",
                duration: "5:12"
        },
        {
                url: 2,
                title: "Sample Video 2",
                thumbnail: "https://unsplash.it/250/150?gravity=center",
                channel_icon: "https://unsplash.it/36/36?gravity=center",
                channel_name: "Demo Channel",
                views: "23K",
                uploaded: "1 week ago",
                duration: "12:45"
        },
        {
                url: 3,
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
        <input></input>
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
        const section = document.createElement('div');
        section.className = 'channel-banner';

        posts.forEach(post => {
                const videoCard = createVideoCard(post);
                section.appendChild(videoCard);
        });

        videosContainer.appendChild(section);
}
loadVideos();
