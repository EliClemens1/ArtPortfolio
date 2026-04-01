export default {
    template: `
        <h1 id="titleformat">Upload Artwork</h1>

        <div id="formContainer">
            <form @submit.prevent="artSubmit">
                <label for="artTitle">Title:</label>
                <input v-model="artTitle" id="artTitle" name="artTitle"/><br>

                <label for="artDesc">Description:</label>
                <textarea v-model="artDesc" id="artDesc" name="artDesc" rows="1" cols="40"></textarea><br>

                <label for="artDate">Date:</label>
                <input v-model="artDate" id="artDate" type="date" name="artDate"/><br>

                <label for="artPrint">Print Type:</label>
                <input v-model="artPrint" id="artPrint" name="artPrint"/><br>

                <label for="artLocation">Location:</label>
                <input v-model="artLocation" id="artLocation" name="artLocation"/><br>

                <label for="artMedium">Medium:</label>
                <input v-model="artMedium" id="artMedium" name="artMedium"/><br>

                <label for="artHeight">Height (in):</label>
                <input v-model="artHeight" type="number" min="0" id="artHeight" name="artHeight"/>

                <label for="artWidth" style="margin-left: 10px">Width (in):</label>
                <input v-model="artWidth" type="number" min="0" id="artWidth" name="artWidth"/>
                
                <label for="artDepth" style="margin-left: 10px">Depth (in):</label>
                <input v-model="artDepth" type="number" min="0" id="artDepth" name="artDepth"/><br>

                <label for="artImages">Images:</label>
                <input v-model="artImages" v-on:change="previewImages" id="artImages" type="file" name="artImages" multiple/>
                <div id="imgsPreview"></div><br>

                <input type="submit" value="Upload"/>
            </form>
        </div>
    `,
// I went ahead and added my initials to comments that don't necessarily explain the code and can be removed later (besides this one). - Emma
    data() {
        return {
            // The variable names need to be changed so that they match with the database - E.B.
            artTitle: '',
            artDesc: '',
            artDate: '',
            artPrint: '',
            artLocation: '',
            artMedium: '',
            artHeight: '', // I separated all of the dimensions into different inputs since I figured that'd be easier than having the user type out each x, but if we want to change that we can - E.B.
            artWidth: '',
            artDepth: '',
            artImages: []
        }
    },

    methods: {
        // This is just a temp method that I'm using for testing -E.B.
        artSubmit() {
            alert(this.artTitle + ',' + this.artDesc + ',' + this.artDate + ',' + this.artPrint + ',' + this.artLocation + ',' + this.artMedium + ',' + this.artHeight + 'x' + this.artWidth + 'x' + this.artDepth + ',' + this.artImages)
        },

        previewImages() {
            var artUpload = document.getElementById("artImages");
            if (typeof (FileReader) != undefined) { // Only runs if file(s) were chosen
                var artPreview = document.getElementById("imgsPreview");
                artPreview.innerHTML = "";
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/; // Regex for image file types
                // I'm not sure what file types we want to be able to be uploaded, so we can change them however we need. I just copied the Regex from the example I found - E.B.
                for (var i = 0; i < artUpload.files.length; i++) { // Loops through the file list that the input tag creates
                    var artFile = artUpload.files[i];
                    if (regex.test(artFile.name.toLowerCase())) { // Tests to make sure the file matches the Regex
                        var reader = new FileReader;
                        reader.onload = function (e) { // Creates an image tag to display the image on the page
                            var img = document.createElement("IMG");
                            img.src = e.target.result;
                            artPreview.appendChild(img);
                        }
                        reader.readAsDataURL(artFile);
                    }
                    else { // Runs if file type is invalid
                        alert(artFile.name + "is not a valid image file.");
                        artPreview.innerHTML = "";
                        return false;
                    }
                }
            }
            else {
                alert("This browser does not support HTML5 FileReader");
            }
        }
    }
}