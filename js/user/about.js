async function loadGallery() {

    const galleryGrid =
        document.getElementById("galleryGrid");

    const { data, error } =
        await window.db
        .from("Gallery")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);
        return;

    }

    galleryGrid.innerHTML = "";

    data.forEach(image => {

        galleryGrid.innerHTML += `
            <div class="gallery-item">

                <img
                    src="${image.image_url}"
                    alt="${image.title}">
            </div>
        `;

    });

}

loadGallery();