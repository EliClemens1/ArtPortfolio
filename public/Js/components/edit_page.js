export default {
    template: `
        <h1 id="titleformat">Edit Artwork</h1>

        <div id="formContainer">
            <form>
                <label for="artTitle">Title:</label>
                <input id="artTitle" name="artTitle"
                v-model="artwork.title"

                /><br>

                <label for="artDesc">Description:</label>
                <textarea id="artDesc" name="artDesc" rows="1" cols="40" v-model="editableArtwork.longDescription"></textarea><br>

                <label for="artDate">Date:</label>
                <input id="artDate" name="artDate" v-model="artwork.date"/><br>

                <label for="artPrint">Print Type:</label>
                <input id="artPrint" name="artPrint"/><br>

                <label for="artLocation">Location:</label>
                <input id="artLocation" name="artLocation"/><br>

                <label for="artMedium">Medium:</label>
                <input id="artMedium" name="artMedium" v-model="artwork.medium"/><br>

                <label for="artHeight">Height:</label>
                <input type="number" min="0" id="artHeight" name="artHeight"
                v-model="artwork.height"/>

                <label for="artWidth" style="margin-left: 5px">Width:</label>
                <input type="number" min="0" id="artWidth" name="artWidth" v-model="artwork.width"/><br>

                <label for="artImages">Images:</label>
                <input id="artImages" type="file" name="artImages" multiple/>
                <div id="imgsPreview"></div><br>

                <input type="submit" value="Upload"/>
            </form>
        </div>
    `,
    props: ["artwork"],
    data() {
  return {
    editableArtwork: { ...this.artwork } 
  }
}

}

