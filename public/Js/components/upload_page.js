import { db, storage } from "../FireBase/firebase_config.js";
import { addArtwork } from "../FireBase/firebase_service.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";

export default {
    template: `
        <div class="button-row">
        <button class="buttonformat" @click="$emit('back')">Back</button>
        </div>
        <h1 id="titleformat">Upload Artwork</h1>

        <div id="formContainer">
            <form class="artworkForm" @submit.prevent="saveArtwork">
            <label>Subject:</label>
            <input v-model="subject" />

            <label>Year:</label>
            <input v-model="year" placeholder="2026" />

            <label>Category:</label>
            <input v-model="category" />

            <label>Materials:</label>
            <input v-model="materials" />

            <label>Styles:</label>
            <input v-model="styles" />

            <label>Visibility:</label>
            <select v-model="visibility">
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
            </select>

            <hr>

            <label>Title:</label>
            <input v-model="title" />

            <label>Short Description:</label>
            <textarea rows="2" v-model="shortDescription"></textarea>

            <label>Long Description:</label>
            <textarea rows="4" v-model="longDescription"></textarea>

            <label>Medium:</label>
            <input v-model="medium" />

            <label>Dimensions:</label>
            <input v-model="dimensions" />

            <hr>

            <label>Main Image:</label>
            <input type="file" @change="handleImageUpload" />

            <div>
                <img v-if="previewImage" :src="previewImage" alt="Preview" />
            </div>

            <label>Other Images:</label>
            <input id="uploadOtherImages" type="file" @change="handleMultiImageUpload" multiple />

            <div id="otherImgsPreview"></div>
            <br>

            <input
            type="submit"
            :value="isUploading ? 'Uploading...' : 'Upload'"
            :disabled="isUploading" />
            </form>
        </div>
    `,

    data() {
        return {
            isUploading: false,

            selectedFile: null,
            previewImage: null,

            title: "",
            shortDescription: "",
            longDescription: "",

            subject: "",
            year: "",
            category: "",
            medium: "",
            materials: "",
            styles: "",
            dimensions: "",

            visibility: "unpublished",   
            dateUploaded: ""
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
                if (this.isUploading) return;
                this.isUploading = true;
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
                    title: this.title,
                    shortDescription: this.shortDescription,
                    longDescription: this.longDescription,

                    subject: this.subject,
                    year: this.year,
                    category: this.category,
                    medium: this.medium,
                    materials: this.materials,
                    styles: this.styles,
                    dimensions: this.dimensions,

                    visibility: this.visibility,

                    masterImage: imageUrl,
                    images: otherImageUrls,

                    dateUploaded: new Date().toISOString()
                };

                await addArtwork(artwork);

                alert("Artwork uploaded successfully!");
                this.$emit("upload-complete");
            } catch (error) {
                console.error("Upload failed:", error);
            }finally {
                this.isUploading = false;
            }
        }
    }
}