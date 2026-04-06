import MainPage from "./components/main_page.js"
import DetailsPage from "./components/details_page.js"
import LoginPage from "./components/login_page.js"
import EditPage from "./components/edit_page.js"    
import UploadPage from "./components/upload_page.js"
import {auth, provider} from "./FireBase/firebase_config.js"
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const { createApp } = Vue


createApp({

    components: {
        'login-page': LoginPage,
        'main-page': MainPage,
        'details-page': DetailsPage,
        'edit-page' : EditPage,
        'upload-page' : UploadPage
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
        async loginSuccess(){
            try{
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            console.log("Logged in: ", user)

            this.currentPage = "main"
            }catch(error)
            {
                console.log("Login failed: ", error)
            }

        },
        openDetails(art) {
            //art is the current selectedArtwork object that was passed from the main page when a user clicks an artwork card. 
            // We set that object to selectedArtwork and change the page to details, which will show the details page and pass the selected artwork to it.
            this.selectedArtwork = art
            this.currentPage = "details"
        },
        returnToMain(){
            this.currentPage = "main"
        },

        openEdit(art) {
            this.selectedArtwork = art
            this.currentPage = "edit"
        },
        openUpload(){
            this.currentPage = "upload";
        }
    }

}).mount("#app")