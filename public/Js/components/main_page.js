export default {

    data() {
        return {

            artworks: [
                {
                    title: "Ocean Foam",
                    artist: "E Like Lemons",
                    date: "2024",
                    medium: "Watercolor",
                    longDescription: "This whimsical digital painting captures the hilarity and chaos of a cat unexpectedly finding itself in a bathtub. With fur slicked down and wide eyes, the wet cat conveys both surprise and reluctant curiosity. The artwork uses soft pastel colors for the background to highlight the shiny wet fur of the cat, creating a playful contrast. Brushstrokes emphasize texture and water reflections, while subtle splashes around the tub suggest movement. Perfect for cat lovers, this piece combines humor, emotion, and artistic skill in a single charming composition.",
                    dimensions: "24 x 36 in",
                    image: "placeholderImages/wetCat.jpg",
                    extraImages: [
                        "placeholderImages/wetCat2.jpg",
                        "placeholderImages/wetCat3.jpg",
                        "placeholderImages/wetCat4.jpg"
                    ]
                },
                {
                    title: "Finals Week",
                    artist: "Rick Sanchez",
                    date: "2023",
                    medium: "Acrylic",
                    longDescription: "This expressive digital illustration captures the unmistakable look of a cat caught in a moment of pure frustration. With ears flattened, eyes narrowed, and tail twitching, the cat’s body language communicates irritation in a way only felines can. The artist uses bold lines and exaggerated expressions to highlight the humor and intensity of the moment, while muted background colors keep the focus on the cat’s mood. Subtle shading and attention to fur texture make the character feel alive, evoking both empathy and amusement from viewers. Ideal for anyone who has ever felt the comedic drama of a pet’s displeasure.",
                    dimensions: "18 x 24 in",
                    image: "placeholderImages/Frustrated.jpg",
                    extraImages: [
                        "placeholderImages/Frustrated2.jpg",
                        "placeholderImages/Frustrated3.jpg",
                        "placeholderImages/Frustrated4.jpg"
                    ]
                },
                {
                    title: "Graduated!",
                    artist: "Rick Clemens",
                    date: "2028",
                    medium: "Crayon",
                    dimensions: "18 x 24 in",
                    longDescription:  "Celebrating the proud and accomplished spirit of a cat in a tiny graduation cap, this charming digital painting captures a moment of feline triumph. The cat sits tall, eyes gleaming with pride, as if ready to conquer the world after completing its studies. The artist uses soft lighting and warm tones to evoke a sense of accomplishment and joy. Subtle details, like the slightly crooked cap and the cat’s relaxed posture, add personality and humor, making the piece both heartwarming and playful. Perfect for cat lovers and graduates alike, this artwork conveys achievement, celebration, and a dash of whimsy.",
                    image: "placeholderImages/CoolCat.jpg",
                    extraImages: [
                        "placeholderImages/CoolCat2.jpg",
                        "placeholderImages/CoolCat3.jpg",
                        "placeholderImages/CoolCat4.jpg"
                    ]
                }
            ]
        }
    },

    methods: {

        //This method runs when a user clicks an artwork card. the card click is defined in the template with @click="selectArtwork(art)
        // "art" is the artwork object from the v-for loop in the template. We pass that object"
        //emit an event called "open-details" and pass the artwork object as data. The parent component (app.js) listens for this event and runs the openDetails method, 
        // which stores the selected artwork and changes the currentPage state to details.
        //open-details is located in app.js
        selectArtwork(art) {
            //tell the parent which artwork was selected from v-for(art in artworks) array and emit the signal to open the details page
            this.$emit("open-details", art)
        }

    },
    template: `
    <div class="main-page">

        <h2>Main Page</h2>

        <div class="actions">
            <input type="text" placeholder="Search artwork...">
            <button>Upload</button>
            <button>Filter</button>
        </div>

        <div class="artwork-list">

            <div class="art-card"
                 v-for="art in artworks"
                 :key="art.title"
                 @click="selectArtwork(art)">

                <div class="art-image">
                    <img :src="art.image" alt="Artwork Image">
                </div>

                <div class="art-info">
                    <h3>{{ art.title }}</h3>
                    <p>{{ art.artist }}</p>

                </div>

            </div>

        </div>

    </div>
    `
}