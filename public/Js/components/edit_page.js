import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { db } from "../FireBase/firebase_config.js";


export default {
    template: `

        <div class="button-row">
        <button class="buttonformat" @click="$emit('back')">Back</button>
        </div>
        <h1 id="titleformat">Edit Artwork</h1>

        <div id="formContainer">
            <form @submit.prevent="updateArtwork">
                <label for="artTitle">Title:</label>
                <input id="artTitle" name="artTitle"
                v-model="editableArtwork.title"

                /><br>
        

                <label for="artDesc">Description:</label>
                <textarea id="artDesc" name="artDesc" rows="1" cols="40" v-model="editableArtwork.longDescription"></textarea><br>

                <label for="artDate">Date:</label>
                <input id="artDate" name="artDate" v-model="editableArtwork.date"/><br>

                <label for="artPrint">Print Type:</label>
                <input id="artPrint" name="artPrint" v-model="editableArtwork.printType"/><br>

                <label for="artLocation">Location:</label>
                <input id="artLocation" name="artLocation" v-model="editableArtwork.location"/><br>

                <label for="artMedium">Medium:</label>
                <input id="artMedium" name="artMedium" v-model="editableArtwork.medium"/><br>

                <label for="artDimensions">Dimensions:</label>
                <input id="ArtDimensions" name="artDimensions" v-model="editableArtwork.dimensions"/><br>

                <div>
                  <img v-if="previewImage" :src="previewImage" alt="Main Preview"/>
                </div>

                <!-- Other Images Preview -->
                <div>
                  <img 
                    v-for="(img, index) in otherPreviewImages" 
                    :key="index" 
                    :src="img" 
                    class="preview-img"/>
                </div>

                <input type="submit" value="Upload"/>
            </form>
        </div>
    `,
    props: ["artwork"],
    data() {
  return {
    editableArtwork: { ...this.artwork },
    previewImage: this.artwork.imageUrl,     
    otherPreviewImages: [...(this.artwork.otherImages || [])] 
  }
},
    methods: {
async updateArtwork() {
  try {

    const docRef = doc(db, "artworks", this.artwork.id);

    await updateDoc(docRef, {
      ...this.editableArtwork,
      imageUrl: this.previewImage,
      otherImages: this.otherPreviewImages
    });

    console.log("UPDATE SUCCESS");
    alert("Artwork updated!");
    this.$emit("back");

  } catch (error) {
    console.error("UPDATE ERROR:", error);
  }
},


handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  this.selectedFile = file;
  this.previewImage = URL.createObjectURL(file);
},

handleMultiImageUpload(event) {
  const files = event.target.files;

  for (let file of files) {
    this.otherPreviewImages.push(URL.createObjectURL(file));
  }
        },

}

}
