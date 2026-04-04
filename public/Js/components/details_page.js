export default {
  template: `
    <div>

<div class="button-row">
    <button class="buttonformat" @click="$emit('back')">Back</button>
     <button class="buttonformat edit-button" @click="$emit('open-edit', artwork)">Edit</button>
</div>

      <h1 id="titleformat">Details</h1>

      <!-- Grid container: left and right columns -->
      <div class="side-by-side-grid">
        <!-- Left column -->
        <div class="left-column">
          <img :src="selectedImage" alt="Main Image">
          <p class="placeholder-title">{{ artwork.title }}</p>
        </div>

        <!-- Right column -->
        <div class="right-column ">
          <div class="border-box" id="divesizeincrease">
            <img
              :src="artwork.image"
              alt="Original Image"
              class="image-button"
              @click="setMainImage(artwork.image)">
            <img 
              v-for="(img, index) in artwork.extraImages"
              :key="index"
              :src="img"
              :alt="'Image ' + (index + 1)"
              class="image-button"
              @click="setMainImage(img)">

          </div>
          <p class="border-box" id="biggerdescription">{{artwork.longDescription}}</p>
          <p class="border-box"> Artist: {{ artwork.artist }}</p>
          <p class="border-box">Placeholder 4</p>
        </div>
      </div>

      <!-- Second Grid -->
      <div class="grid-container2">
        <!-- Empty first column -->
        <div class="content-column">
          <p class="paddingforparts"> Date: </p>
          <p class="paddingforparts"> Print Type: </p>
          <p class="paddingforparts">Location: </p>
          <p class="paddingforparts">Medium: </p>
          <p class="paddingforparts">Demensions: </p>

          </div>

        <!-- Second column -->
        <div class="content-column">
          <p class="border-box">{{ artwork.date }}</p>
          <p class="border-box">placeholder 6</p>
          <p class="border-box">placeholder</p>
          <p class="border-box">{{ artwork.height }} x {{artwork.width }}</p>
          <p class="border-box">{{ artwork.dimensions }}</p>
        </div>
      </div>
    </div>
  `,
  //artwork is bound to selectedArtwork in index.html. When a user clicks an artwork card on the main page, that artwork object is passed to app.js and set as selectedArtwork. 
  // Then when the details page is shown, it receives that selectedArtwork as a prop called "artwork". So we can access the properties of the selected artwork using "artwork.propertyName" in this component.
  props: ["artwork"],

  data() {
    return {
      selectedImage: this.artwork.image
    };
  },

  methods: {
    returnToMain() {
    },
      setMainImage(img) {
    this.selectedImage = img;
  }
  }



}