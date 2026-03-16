import MainPage from "./components/main_page.js"
import DetailsPage from "./components/details_page.js"

const { createApp } = Vue

createApp({

    components: {
        'main-page': MainPage,
        'details-page': DetailsPage
    },

    data() {
        return {
            currentPage: "main",
            selectedArtwork: null
        }
    },
    methods: {
        openDetails(art) {
            //art is the current selectedArtwork object that was passed from the main page when a user clicks an artwork card. 
            // We set that object to selectedArtwork and change the page to details, which will show the details page and pass the selected artwork to it.
            this.selectedArtwork = art
            this.currentPage = "details"
        }
    }

}).mount("#app")