//
const { createApp } = Vue
createApp({
    //Components property registers compontnts so they can be used in the HTML
    components: {
        //This line maps the HTML tag <main-page> to the MainPage component defined in js/components/main_page.js
        //Vue will replace <main-page> with the template defined in MainPage when loading the app
        'main-page' : MainPage,
        // 'details-page' : DetailsPage
    },
    data() {
        return {
            message: "Artist Portfolio"
        }
    }
}).mount("#app")