export default {
    template: `
        <h1 id="titleformat">Upload Artwork</h1>

        <div id="formContainer">
            <form>
                <label for="artTitle">Title:</label>
                <input id="artTitle" name="artTitle"/><br>

                <label for="artDesc">Description:</label>
                <textarea id="artDesc" name="artDesc" rows="1" cols="40"></textarea><br>

                <label for="artDate">Date:</label>
                <input id="artDate" type="date" name="artDate"/><br>

                <label for="artPrint">Print Type:</label>
                <input id="artPrint" name="artPrint"/><br>

                <label for="artLocation">Location:</label>
                <input id="artLocation" name="artLocation"/><br>

                <label for="artMedium">Medium:</label>
                <input id="artMedium" name="artMedium"/><br>

                <label for="artHeight">Height (in):</label>
                <input type="number" min="0" id="artHeight" name="artHeight"/>

                <label for="artWidth" style="margin-left: 10px">Width (in):</label>
                <input type="number" min="0" id="artWidth" name="artWidth"/>
                
                <label for="artDepth" style="margin-left: 10px">Depth (in):</label>
                <input type="number" min="0" id="artDepth" name="artDepth"/><br>

                <label for="artImages">Images:</label>
                <input id="artImages" type="file" name="artImages" multiple/>
                <div id="imgsPreview"></div><br>

                <input type="submit" value="Upload"/>
            </form>
        </div>
    `
}