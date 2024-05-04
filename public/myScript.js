function displayThumbnail() {
    const fileInput = document.getElementById("imageInput");
    const thumbnail = document.getElementById("thumbnail");

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        thumbnail.src = e.target.result;
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }

//  confirmation 
const deleteForms = document.querySelectorAll("#deleteForm");
;
deleteForms.forEach(form => {
    form.addEventListener("submit", (event) => {
        const confirmDelete = confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            event.preventDefault();
         
        }
    });
});
