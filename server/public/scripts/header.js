
function populateHeader() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="location">
        <img class="location-img" src="/images/location-sf.jpg" alt="">
        <p class="location-name">San Francisco</p>
    </div>
    `;
}


function populateNav() {
    const nav = document.querySelector('nav');
    nav.innerHTML = `
        <header>
        <header>
            <div class="header">
                <div class="header-item">
                    <a href="/">Home</a>
                </div>
                <div class="header-item">
                    <a href="/attractions">Attractions</a>
                </div>
                <div class="header-item">
                    <a href="/restaurants">Restaurants</a>
                </div>
                <div class="header-item">
                    <a href="/newform">Add Restaurant</a>
                </div>
            </div>
        </header>
    </header>
    `;
}


function populateFooter() {
    const footer = document.querySelector('footer');
    footer.innerHTML = `
        <footer>
        <p>&copy; 2024 Explore San Francisco</p>
    </footer>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    populateHeader();
    populateNav();
    populateFooter();
});
