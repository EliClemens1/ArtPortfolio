import { db, storage } from "../FireBase/firebase_config.js";
import { addArtwork } from "../FireBase/firebase_service.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";

export default {
    template: `
        <h1 id="titleformat">Upload Artwork</h1>

        <div id="formContainer">
            <form class="artworkForm" @submit.prevent="saveArtwork">
                <label for="artTitle">Title:</label>
                <input id="uploadArtTitle" name="artTitle" v-model="artTitle"/><br>

                <label for="artShortDesc">Short Descriptions:</label>
                <textarea id="uploadShortDesc" name="artShortDesc" rows="1" cols="30" v-model="artShortDesc"></textarea><br>

                <label for="artLongDesc">Description:</label>
                <textarea id="uploadArtDesc" name="artLongDesc" rows="3" cols="40" v-model="artLongDesc"></textarea><br>

                <label for="artDate">Date:</label>
                <input id="uploadArtDate" type="date" name="artDate" v-model="artDate"/><br>

                <label for="artPrint">Print Type:</label>
                <input id="uploadArtPrint" name="artPrint" v-model="artPrint"/><br>

                <label for="artLocation">Location:</label>
                <input id="uploadArtLocation" name="artLocation" v-model="artLocation"/><br>

                <label for="artMedium">Medium:</label>
                <input id="uploadArtMedium" name="artMedium" v-model="artMedium"/><br>

                <label for="artDimensions">Dimensions:</label>
                <input id="uploadArtDimensions" name="artDimensions" v-model="artDimensions"/><br>

                <label for="ImageUrl">Main Image:</label>
                <input id="uploadImageUrl" type="file" name="ImageUrl" @change="handleImageUpload"/>

                <div id="imgsPreview">
                    <img v-if="previewImage" :src="previewImage" alt="Preview"/>
                </div><br>

                <label for="otherImageURLs">Other Images:</label>
                <input id="uploadOtherImages" type="file" name="otherImageURLs" @change="handleMultiImageUpload" multiple/>

                <div id="otherImgsPreview"></div><br>

                <input type="submit" value="Upload"/>
            </form>
        </div>
    `,

    data() {
        return {
            selectedFile: null,
            previewImage: null,

            artTitle: "",
            artShortDesc: "",
            artLongDesc: "",
            artDate: "",
            artPrint: "",
            artLocation: "",
            artMedium: "",
            artDimensions: ""
        };
    },

    methods: {
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.selectedFile = file;
            this.previewImage = URL.createObjectURL(file);
        },

        handleMultiImageUpload() {
            var multiImageUpload = document.getElementById("uploadOtherImages");
            if (typeof (FileReader) != "undefined") {
                var multiImagePreview = document.getElementById("otherImgsPreview");
                multiImagePreview.innerHTML = "";
                for (var i = 0; i < multiImageUpload.files.length; i++) {
                    var file = multiImageUpload.files[i]
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var img = document.createElement("IMG");
                        img.src = e.target.result;
                        multiImagePreview.appendChild(img);
                    }
                    reader.readAsDataURL(file);
                }
            }
        },

        async saveArtwork() {
            try {
                let imageUrl = "";
                let otherImageUrl = "";
                let otherImageUrls = [];

                if (this.selectedFile) {
                    const storageRef = ref(
                        storage,
                        `artworks/${this.selectedFile.name}`
                    );

                    await uploadBytes(storageRef, this.selectedFile);

                    imageUrl = await getDownloadURL(storageRef);
                    console.log("Image URL:", imageUrl);
                }

                var multiImageUpload = document.getElementById("uploadOtherImages");
                if (typeof (FileReader) != "undefined") {
                    for (var i = 0; i < multiImageUpload.files.length; i++) {
                        const storageRef = ref(
                            storage,
                            `artworks/${multiImageUpload.files[i].name}`
                        );

                        await uploadBytes(storageRef, multiImageUpload.files[i]);

                        otherImageUrl = await getDownloadURL(storageRef);
                        console.log("Image URL:", otherImageUrl);

                        otherImageUrls.push(otherImageUrl);
                        console.log(otherImageUrls);
                    }
                }

                const artwork = {
                    title: this.artTitle,
                    shortDescription: this.artShortDesc,
                    longDescription: this.artLongDesc,
                    date: this.artDate,
                    printType: this.artPrint,
                    location: this.artLocation,
                    medium: this.artMedium,
                    dimensions: this.artDimensions,
                    imageUrl: imageUrl,
                    otherImages: otherImageUrls
                };

                await addArtwork(artwork);

                alert("Artwork uploaded successfully!");
                this.$emit("upload-complete");
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }
    }
}