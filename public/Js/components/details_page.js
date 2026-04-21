export default {
  template: `
    <div>

      <div class="button-row">
        <button class="buttonformat" @click="$emit('back')">Back</button>
        <button class="buttonformat edit-button" @click="$emit('open-edit', artwork)">Edit</button>
      </div>

      <h1 id="titleformat">Details</h1>

      <div class="side-by-side-grid">
        <!-- Left column -->
        <div class="details-left-column">
          <img :src="selectedImage" alt="Main Image">
          <p class="placeholder-title">{{ artwork.title }}</p>
        </div>

        <!-- Right column -->
        <div class="right-column">
          <div class="border-box">
            <img
              :src="artwork.imageUrl"
              alt="Original Image"
              class="image-button"
              @click="setMainImage(artwork.imageUrl)">

            <img 
              v-for="(img, index) in artwork.otherImages"
              :key="index"
              :src="img"
              :alt="'Image ' + (index + 1)"
              class="image-button"
              @click="setMainImage(img)">
          </div>

          <p class="border-box" id="longDescription">
            {{ artwork.longDescription }}
          </p>
          <p class="border-box">Artist: {{ artwork.artist }}</p>
          <p class="border-box">Placeholder 4</p>
        </div>
      </div>

      <div class="grid-container2">
        <div class="content-column">
          <p class="paddingforparts">Date:</p>
          <p class="paddingforparts">Print Type:</p>
          <p class="paddingforparts">Location:</p>
          <p class="paddingforparts">Medium:</p>
          <p class="paddingforparts">Dimensions:</p>
        </div>

        <div class="content-column">
          <p class="border-box">{{ artwork.date }}</p>
          <p class="border-box">placeholder 6</p>
          <p class="border-box">placeholder</p>
          <p class="border-box">{{ artwork.medium }}</p>
          <p class="border-box">{{ artwork.dimensions }}</p>
        </div>
      </div>
    </div>
  `,

  props: ["artwork"],

  data() {
    return {
      selectedImage: this.artwork.imageUrl
    };
  },

  methods: {
    setMainImage(img) {
      this.selectedImage = img;
    }
  }
}