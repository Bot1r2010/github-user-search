let userInput = document.querySelector(".container .search-box input");
let infoBox = document.querySelector(".container .info-box");

userInput.addEventListener("keyup", (e) => {
    if (userInput.value != '' && e.key == "Enter") {
        getData(userInput.value);
    }
});

let getData = (username) => {
    let url = `https://api.github.com/users/${username}`;
    fetch(url).then((res) => res.json()).then((data) => {
        if (data.message !== "Not Found") {
            const dateData = data.created_at.slice(0, 10);
            const location = data.location || "No location";
            const twitter = data.twitter_username || "No X";
            const website = data.blog || "No Website";
            const company = data.company || "No Company";
            const bio = data.bio || "This profile has no bio";

            infoBox.innerHTML = `
            <div class="user-details">
                <div class="header-info">
                    <div class="img-box">
                        <img src="${data.avatar_url}" alt="avatar">
                    </div>
                    <div class="details">
                        <h3 class="name">${data.name || data.login}</h3>
                        <h3 class="username">@${data.login}</h3>
                        <span class="join-date">Joined ${dateData}</span>
                    </div>
                </div>
                <p class="bio">${bio}</p>
                <div class="user-profile">
                    <div class="stat">
                        <span>Repos</span>
                        <h2>${data.public_repos}</h2>
                    </div>
                    <div class="stat">
                        <span>Followers</span>
                        <h2>${data.followers}</h2>
                    </div>
                    <div class="stat">
                        <span>Following</span>
                        <h2>${data.following}</h2>
                    </div>
                </div>
                <div class="user-other-details">
                    <p><i class="fa-solid fa-building"></i> ${company}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${location}</p>
                    <p><i class="fa-solid fa-link"></i> ${website}</p>
                    <p><i class="fa-brands fa-x-twitter"></i> ${twitter}</p>
                </div>
            </div>`;
        } else {
            infoBox.innerHTML = `<p style="color: #ff7b72; text-align: center;">User not found</p>`;
        }
    })
}

getData("github");