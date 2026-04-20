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

          <!-- Image selector -->
          <div class="border-box">
            <img
              :src="artwork.masterImage"
              class="image-button"
              @click="setMainImage(artwork.masterImage)">

            <img 
              v-for="(img, index) in artwork.images"
              :key="index"
              :src="img"
              class="image-button"
              @click="setMainImage(img)">
          </div>

          <p class="border-box" id="longDescription">
            {{ artwork.longDescription }}
          </p>

          <p class="border-box">Subject: {{ artwork.subject }}</p>
          <p class="border-box">Category: {{ artwork.category }}</p>

        </div>
      </div>

      <div class="details-info-wrapper">
        <div class="details-info-list">
          <div class="details-row">
            <div class="details-label">Year</div>
            <div class="details-value">{{ artwork.year }}</div>
          </div>

          <div class="details-row">
            <div class="details-label">Medium</div>
            <div class="details-value">{{ artwork.medium }}</div>
          </div>

          <div class="details-row">
            <div class="details-label">Materials</div>
            <div class="details-value">{{ artwork.materials }}</div>
          </div>

          <div class="details-row">
            <div class="details-label">Styles</div>
            <div class="details-value">{{ artwork.styles }}</div>
          </div>

          <div class="details-row">
            <div class="details-label">Dimensions</div>
            <div class="details-value">{{ artwork.dimensions }}</div>
          </div>

          <div class="details-row">
            <div class="details-label">Status</div>
            <div class="details-value">{{ artwork.visibility }}</div>
          </div>

          <div class="details-row">
            <div class="details-label">Uploaded</div>
            <div class="details-value">{{ formatDate(artwork.dateUploaded) }}</div>
          </div>
        </div>
      </div>
    </div>
  `,

  props: ["artwork"],

  data() {
    return {
      selectedImage: this.artwork.masterImage
    };
  },

  methods: {
    setMainImage(img) {
      this.selectedImage = img;
    },
    formatDate(date) {
  if (!date) return "";
    return new Date(date).toLocaleDateString();
  }
  }
}