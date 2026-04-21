import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { db } from "../FireBase/firebase_config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";
import { storage } from "../FireBase/firebase_config.js";


export default {
  template: `
    <div class="button-row">
    <button class="buttonformat" @click="$emit('back')">Back</button>
    </div>
    <h1 id="titleformat">Edit Artwork</h1>

    <div id="formContainer">
        <form @submit.prevent="updateArtwork">

        <label>Update Main Image:</label>
        <input type="file" @change="handleImageUpload" />

        <label>Update Other Images:</label>
        <input type="file" multiple @change="handleMultiImageUpload" />

        <label>Subject:</label>
        <input v-model="editableArtwork.subject" />

        <label>Year:</label>
        <input v-model="editableArtwork.year" />

        <label>Category:</label>
        <input v-model="editableArtwork.category" />

        <label>Materials:</label>
        <input v-model="editableArtwork.materials" />

        <label>Styles:</label>
        <input v-model="editableArtwork.styles" />

        <label>Visibility:</label>
        <select v-model="editableArtwork.visibility">
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
        </select>

        <hr>

        <label>Title:</label>
        <input v-model="editableArtwork.title" />

        <label>Short Description:</label>
        <textarea v-model="editableArtwork.shortDescription"></textarea>

        <label>Long Description:</label>
        <textarea v-model="editableArtwork.longDescription"></textarea>

        <label>Medium:</label>
        <input v-model="editableArtwork.medium" />

        <label>Dimensions:</label>
        <input v-model="editableArtwork.dimensions" />
        <br><br>

      <input
        type="submit"
        :value="isUpdating ? 'Updating...' : 'Update'"
        :disabled="isUpdating" />    
        </form>
    </div>
  `,   
  emits: ["back"], 
  props: ["artwork"],
  data() {
    return {
      isUpdating: false,

      editableArtwork: { ...this.artwork },
      selectedFile: null,
      selectedOtherFiles: [],
      previewImage: this.artwork.masterImage,
      otherPreviewImages: [...(this.artwork.images || [])]
    };
  },
  methods: {
    async updateArtwork() {
      try {
        if (this.isUpdating) return;
        this.isUpdating = true;
        const docRef = doc(db, "artworks", this.artwork.id);

        let imageUrl = this.artwork.masterImage;
        let otherImageUrls = this.artwork.images || [];

        if (this.selectedFile) {
          const storageRef = ref(storage, `artworks/${this.selectedFile.name}`);
          await uploadBytes(storageRef, this.selectedFile);
          imageUrl = await getDownloadURL(storageRef);
        }

        if (this.selectedOtherFiles.length > 0) {
          otherImageUrls = [];

          for (let file of this.selectedOtherFiles) {
            const storageRef = ref(storage, `artworks/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            otherImageUrls.push(url);
          }
        }

        await updateDoc(docRef, {
          ...this.editableArtwork,
          masterImage: imageUrl,
          images: otherImageUrls
        });

        Object.assign(this.artwork, {
          ...this.editableArtwork,
          masterImage: imageUrl,
          images: otherImageUrls
        });

        alert("Artwork updated!");
        this.$emit("back");

      } catch (error) {
        console.error("UPDATE ERROR:", error);
      } finally {
        this.isUpdating = false;
      }      
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    },

    handleMultiImageUpload(event) {
      const files = Array.from(event.target.files);

      this.selectedOtherFiles = files;
      this.otherPreviewImages = files.map(file => URL.createObjectURL(file));
    }
  }
}
