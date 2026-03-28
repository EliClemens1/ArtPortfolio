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

    data() {
        return {
            artTitle: '',
            artDesc: '',
            artDate: '',
            artPrint: '',
            artLocation: '',
            artMedium: '',
            artHeight: '',
            artWidth: '',
            artDepth: '',
            artImages: []
        }
    },

    methods: {
        artSubmit() {
            alert(this.artTitle + ',' + this.artDesc + ',' + this.artDate + ',' + this.artPrint + ',' + this.artLocation + ',' + this.artMedium + ',' + this.artHeight + 'x' + this.artWidth + 'x' + this.artDepth + ',' + this.artImages)
        },

        previewImages() {
            var artUpload = document.getElementById("artImages");
            if (typeof (FileReader) != undefined) {
                var artPreview = document.getElementById("imgsPreview");
                artPreview.innerHTML = "";
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                for (var i = 0; i < artUpload.files.length; i++) {
                    var artFile = artUpload.files[i];
                    if (regex.test(artFile.name.toLowerCase())) {
                        var reader = new FileReader;
                        reader.onload = function (e) {
                            var img = document.createElement("IMG");
                            img.src = e.target.result;
                            artPreview.appendChild(img);
                        }
                        reader.readAsDataURL(artFile);
                    }
                    else {
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