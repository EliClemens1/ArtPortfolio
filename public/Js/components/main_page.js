import { db } from "../FireBase/firebase_config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { storage } from "../FireBase/firebase_config.js";
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";
export default {

    data() {
        return {

            artworks: [],
            //selectedIds will hold the checkboxes selected for export
            selectedIds: [],
            filters: {
                search: ""
            }
        }
    },

    methods: {

        //This method runs when a user clicks an artwork card. the card click is defined in the template with @click="selectArtwork(art)
        // "art" is the artwork object from the v-for loop in the template. We pass that object"
        //emit an event called "open-details" and pass the artwork object as data. The parent component (app.js) listens for this event and runs the openDetails method, 
        // which stores the selected artwork and changes the currentPage state to details.
        //open-details is located in app.js
        selectArtwork(art) {
            //tell the parent which artwork was selected from v-for(art in artworks) array and emit the signal to open the details page
            this.$emit("open-details", art)
        },

        getSelectedArtworks() {
            return this.artworks.filter(art =>
                this.selectedIds.includes(art.id)
            );
        },

        exportDataToCsv(artworks) {
            // Checks that there are selected artworks
            const selected = this.getSelectedArtworks();
            if (selected.length === 0) {
                alert("No artworks selected");
                return;
            }

            // Outlines headers for the CSV file
            const headers = [
                'title',
                'shortDescription',
                'longDescription',
                'subject',
                'year',
                'category',
                'medium',
                'materials',
                'styles',
                'dimensions',
                'visibility',
                'dateUploaded',
                'masterImage',
                'images'
            ].join(',')

            // Populates CSV rows
            const rows = Object.values(selected).map(art => {
                // Turns images array into a string so it can be put into a single column in the CSV file
                let imagesStr = '';
                if (Array.isArray(art.images)) {
                    imagesStr = art.images.join(' | ');
                }

                // Outlines rows for CSV
                return [
                    art.title,
                    art.shortDescription,
                    art.longDescription,
                    art.subject,
                    art.year,
                    art.category,
                    art.medium,
                    art.materials,
                    art.styles,
                    art.dimensions,
                    art.visibility,
                    art.dateUploaded,
                    art.masterImage,
                    imagesStr
                ].join(',')
            });

            const csvRows = [headers, ...rows].join('\n')

            // Creates download link for CSV file
            const blob = new Blob([csvRows], {type: 'text/csv;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'exported_artwork.csv');
            link.click();
        },

        exportDataToJson() 
        {
            const selected = this.getSelectedArtworks();
            console.log(selected);

            if (selected.length === 0) {
                alert("No artworks selected");
                return;
            }

            const json = JSON.stringify(selected, null, 2);

            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'selected_artworks.json';
            link.click();
        },

        //date for display
        formatDate(date) {
            if (!date) return "";
            return new Date(date).toLocaleDateString();
        },
async deleteArtwork(id) {
  const confirmDelete = confirm("Are you sure you want to delete this artwork?");
  if (!confirmDelete) return;

  try {
    const artwork = this.artworks.find(art => art.id === id);

    if (artwork?.masterImage) {
      try {
        const mainRef = ref(storage, artwork.masterImage);
        await deleteObject(mainRef);
      } catch (err) {}
    }

    if (artwork?.images?.length) {
      const deletePromises = artwork.images.map(async (url) => {
        try {
          const imgRef = ref(storage, url);
          await deleteObject(imgRef);
        } catch (err) {}
      });

      await Promise.all(deletePromises);
    }

    const docRef = doc(db, "artworks", id);
    await deleteDoc(docRef);

    this.artworks = this.artworks.filter(art => art.id !== id);

    alert("Artwork deleted!");
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
}
    },

    computed: {
        filteredArtworks() {
            return this.artworks.filter(art => {

                const search = this.filters.search.toLowerCase();

                return (
                    art.title?.toLowerCase().includes(search) ||
                    art.shortDescription?.toLowerCase().includes(search) ||
                    art.longDescription?.toLowerCase().includes(search) ||
                    art.medium?.toLowerCase().includes(search) ||
                    art.category?.toLowerCase().includes(search) ||
                    art.subject?.toLowerCase().includes(search) 
                );
            });
        }
    },

    template: `
        <div class="main-page">

            <h2></h2>

            <div class="actions">
                <div class="button-row">
                    <button @click="$emit('open-upload')">Upload Artwork</button>
                    <button @click="exportDataToCsv()">Export to CSV</button>
                    <button @click="exportDataToJson()">Export to JSON</button>
                </div>

                <input type="text" v-model="filters.search" placeholder="Search artwork...">
            </div>

            <div class="artwork-list">

                <div class="art-card @click="selectArtwork(art)"
                    v-for="art in filteredArtworks"
                    :key="art.id">

                    <input type="checkbox"
                        :value="art.id"
                        v-model="selectedIds"
                        @click.stop>


                    <!-- Image -->
                    <div class="art-image" @click="selectArtwork(art)">
                        <img :src="art.masterImage" alt="Artwork Image">                       
                        <button class="delete-button"
                            @click.stop="deleteArtwork(art.id)">
                            Delete
                        </button>
                    </div>

                    <div class="art-info" @click="selectArtwork(art)">
                        <h3>{{ art.title }}</h3>

                        <p class="short-description">
                            {{ art.shortDescription }}
                        </p>

                        <p><strong>Medium:</strong> {{ art.medium }}</p>
                        <p><strong>Dimensions:</strong> {{ art.dimensions }}</p>

                        <p><strong>Date Uploaded:</strong> {{ formatDate(art.dateUploaded) }}</p>

                        <p><strong>Status:</strong> {{ art.visibility }}</p>
                    </div>

                </div>

            </div>

        </div>
    `,

    async mounted() {
        const querySnapshot = await getDocs(collection(db, "artworks"));

        this.artworks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },
}