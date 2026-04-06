import { db } from "../FireBase/firebase_config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

export default {

    data() {
        return {

            artworks: []
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
            <button @click="$emit('open-upload')">Upload Artwork</button>
            <button>Filter</button>
        </div>

        <div class="artwork-list">

            <div class="art-card"
                 v-for="art in artworks"
                 :key="art.title"
                 @click="selectArtwork(art)">

                <div class="art-image">
                    <img :src="art.imageUrl" alt="Artwork Image">
                </div>

                <div class="art-info">
                    <h3>{{ art.title }}</h3>
                    <p>{{ art.shortDescription }}</p>

                </div>

            </div>

        </div>

    </div>
    `,
    async mounted() {
    const querySnapshot = await getDocs(collection(db, "artworks"));

    this.artworks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
},
}