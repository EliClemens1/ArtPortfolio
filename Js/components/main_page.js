const MainPage = {
    data() {
        return {

            // Array containing artwork objects
            artworks: [
                {
                    title: "Ocean Foam",
                    artist: "E Like Lemons",
                    date: "2024",
                    medium: "Watercolor",
                    dimensions: "24 x 36 in",
                    image: "placeholderImages/wetCat.jpg"
                },
                {
                    title: "Finals Week",
                    artist: "Rick Sanchez",
                    date: "2023",
                    medium: "Acrylic",
                    dimensions: "18 x 24 in",
                    image: "placeholderImages/Frustrated.jpg"
                },       
                {
                    title: "Graduated!",
                    artist: "Rick Clemens",
                    date: "2028",
                    medium: "Crayon",
                    dimensions: "18 x 24 in",
                    image: "placeholderImages/CoolCat.jpg"
                },
            ]
        }
    },
    template: `
    <div class="main-page">

        <h2>Main Page</h2>

        <!-- Search bar, upload button, and filter button -->
        <div class="actions">
            <input type="text" placeholder="Search artwork...">
            <button>Upload</button>
            <button>Filter</button>
        </div>

        <!-- List of artworks will go here -->
        <div class="artwork-list">
        
        <!-- V-For to loop through 'artworks' array and display them -->
            <div class="art-card" v-for="art in artworks" :key="art.title">
                <div class="art-image">
                    <img :src="art.image" alt="Artwork Image">
                </div>

                <!-- Artwork information -->
                <div class="art-info">
                    <h3>{{ art.title }}</h3>
                    <p>{{ art.artist }}</p>
                    <p>{{ art.date }}</p>
                    <p>{{ art.medium }}</p>
                    <p>{{ art.dimensions }}</p>
                </div>
            </div>
            
        </div>
    </div>`
}