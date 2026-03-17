import MainPage from "./components/main_page.js"
import DetailsPage from "./components/details_page.js"
import LoginPage from "./components/login_page.js"

const { createApp } = Vue

createApp({

    components: {
        'login-page': LoginPage,
        'main-page': MainPage,
        'details-page': DetailsPage
    },
//current page will control the view state of the app. It starts on the login page.
    data() {
        return {
            currentPage: "login",
            selectedArtwork: null
        }
    },
    //if login is successful, change currentPage to main
    methods: {
        loginSuccess(){
            this.currentPage = "main"
        },
        openDetails(art) {
            //art is the current selectedArtwork object that was passed from the main page when a user clicks an artwork card. 
            // We set that object to selectedArtwork and change the page to details, which will show the details page and pass the selected artwork to it.
            this.selectedArtwork = art
            this.currentPage = "details"
        }
    }

}).mount("#app")