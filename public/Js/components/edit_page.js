import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { db } from "../FireBase/firebase_config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";
import { storage } from "../FireBase/firebase_config.js";
import { deleteObject, ref as storageRefFromURL } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";


export default {
template: `
  <div class="button-row">
    <button class="buttonformat" @click="$emit('back')">Back</button>
  </div>

  <h1 id="titleformat">Edit Artwork</h1>

  <div id="formContainer">
    <form class="artworkForm" @submit.prevent="updateArtwork">

      <label>Subject:</label>
      <input v-model="editableArtwork.subject" />

      <label>Year:</label>
      <input v-model="editableArtwork.year" placeholder="2026" />

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

      <label>Title:</label>
      <input v-model="editableArtwork.title" />

      <label>Short Description:</label>
      <textarea rows="2" v-model="editableArtwork.shortDescription"></textarea>

      <label>Long Description:</label>
      <textarea rows="4" v-model="editableArtwork.longDescription"></textarea>

      <label>Medium:</label>
      <input v-model="editableArtwork.medium" />

      <label>Dimensions:</label>
      <input v-model="editableArtwork.dimensions" />

      <label>Main Image:</label>
      <input type="file" @change="handleImageUpload" />
      <button type="button" @click="clearMainImage">Clear Main Image</button>

      <div>
        <img v-if="previewImage" :src="previewImage" alt="Preview" />
      </div>

      <label>Other Images:</label>
      <input 
        id="uploadOtherImages" 
        type="file" 
        multiple 
        @change="handleMultiImageUpload" 
      />
      <button type="button" @click="clearOtherImages">Clear Other Images</button>

      <div id="otherImgsPreview">
        <img
          v-for="(img, index) in otherPreviewImages"
          :key="index"
          :src="img"
        />
      </div>

      <br>

      <input
        type="submit"
        :value="isUpdating ? 'Updating...' : 'Update'"
        :disabled="isUpdating"
      />

    </form>
  </div>
`,   
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

    async deleteImageByURL(url) {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (err) {
    console.warn("Delete failed:", err);
  }
},
async clearMainImage() {
  if (!this.artwork.masterImage) return;

  await this.deleteImageByURL(this.artwork.masterImage);

  this.editableArtwork.masterImage = "";
  this.previewImage = "";
  this.selectedFile = null;
},

async clearOtherImages() {
  if (!this.artwork.images?.length) return;

  await Promise.all(
    this.artwork.images.map(url => this.deleteImageByURL(url))
  );

  this.editableArtwork.images = [];
  this.otherPreviewImages = [];
  this.selectedOtherFiles = [];
},
async updateArtwork() {
  try {
    if (this.isUpdating) return;
    this.isUpdating = true;

    const docRef = doc(db, "artworks", this.artwork.id);

    let imageUrl = this.editableArtwork.masterImage || "";
    let otherImageUrls = this.editableArtwork.images || [];

    if (this.selectedFile) {
      if (this.artwork.masterImage) {
        try {
          const oldRef = ref(storage, this.artwork.masterImage);
          await deleteObject(oldRef);
        } catch (err) {}
      }

      const uniqueName = `${Date.now()}_${this.selectedFile.name}`;
      const storageRef = ref(storage, `artworks/${uniqueName}`);

      await uploadBytes(storageRef, this.selectedFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    if (this.selectedOtherFiles.length > 0) {
      if (this.artwork.images?.length) {
        const deletePromises = this.artwork.images.map(async (url) => {
          try {
            const oldRef = ref(storage, url);
            await deleteObject(oldRef);
          } catch (err) {}
        });

        await Promise.all(deletePromises);
      }

      const uploadPromises = this.selectedOtherFiles.map(async (file) => {
        const uniqueName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `artworks/${uniqueName}`);

        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      otherImageUrls = await Promise.all(uploadPromises);
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
