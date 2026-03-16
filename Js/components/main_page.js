const MainPage = {
//Create vue component called MainPage
//Template contains HTML for the main page of the artist portfolio website use backticks "`" for multi line 
    template: `
    <div class="main-page">

        <h2>Main Page</h2>

        <div class="actions">
            <input type="text" placeholder="Search artwork...">

            <button>Upload</button>

            <button>Filter</button>

        </div>

        <!-- List of artworks will go here -->
        <div class="artwork-list">

            <div class="art-card">

                <div class="art-image">Image</div>

                <div class="art-info">
                    <h3>Artwork Title</h3>
                    <p>Artist Name</p>
                    <p>Date</p>
                    <p>Medium</p>
                    <p>Dimensions</p>
                </div>
            </div>
            
            <div class="art-card">

                <div class="art-image">Image</div>

                <div class="art-info">
                    <h3>Artwork Title</h3>
                    <p>Artist Name</p>
                    <p>Date</p>
                    <p>Medium</p>
                    <p>Dimensions</p>
                </div>
            </div>            
            
            <div class="art-card">

                <div class="art-image">Image</div>

                <div class="art-info">
                    <h3>Artwork Title</h3>
                    <p>Artist Name</p>
                    <p>Date</p>
                    <p>Medium</p>
                    <p>Dimensions</p>
                </div>
            </div>
        </div>`
}