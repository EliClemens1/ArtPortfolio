export default {
  template: `
    <div>


      <button @click="$emit('back')">Back to Gallery</button>

      <h1 id="titleformat">Details</h1>

      <!-- Grid container: left and right columns -->
      <div class="side-by-side-grid">
        <!-- Left column -->
        <div class="left-column">
          <img :src="artwork.image" alt="Placeholder Image">
          <p class="placeholder-text">{{ artwork.title }}</p>
        </div>

        <!-- Right column -->
        <div class="right-column">
          <p class="border-box">Placeholder 1</p>
          <p class="border-box">Placeholder 2</p>
          <p class="border-box">Placeholder 3</p>
          <p class="border-box">Placeholder 4</p>
        </div>
      </div>

      <!-- Second Grid -->
      <div class="grid-container2">
        <!-- Empty first column -->
        <div></div>

        <!-- Second column -->
        <div class="content-column">
          <p class="border-box">placeholder 5</p>
          <p class="border-box">placeholder 6</p>
          <p class="border-box">placeholder 7</p>
          <p class="border-box">placeholder 8</p>
          <p class="border-box">placeholder 8</p>
        </div>
      </div>
    </div>
  `,
  //artwork is bound to selectedArtwork in index.html. When a user clicks an artwork card on the main page, that artwork object is passed to app.js and set as selectedArtwork. 
  // Then when the details page is shown, it receives that selectedArtwork as a prop called "artwork". So we can access the properties of the selected artwork using "artwork.propertyName" in this component.
  props: ["artwork"],

}