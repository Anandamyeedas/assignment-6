const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById('book-container');
const bookDetails = document.getElementById("book-details");
const errorDiv = document.getElementById("error");


searchBtn.addEventListener("click", function () {
    const searchText = searchInput.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }

    // clear dom
    bookContainer.innerHTML = "";
    // bookDetails.innerHTML = "";
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => showData(data));
});
    const showData = bookArray => {
        searchInput.value = '';
    

    // error fixed
    if (bookArray.status === 404) {
        errorDiv.innerText = "NO Result Found";
    } else {
        errorDiv.innerText = "";
    }
    document.getElementById("book-count").innerText ="Serach result: " + bookArray.numFound;

    

    bookArray.docs.slice(0, 20).forEach((docs) => {
    
    
    
        const div = document.createElement("div");
        div.classList.add("col-md-3");
        div.innerHTML = `
        <!-- image -->
        <div class="rounded overflow-hidden border p-2">
            <img src="https://covers.openlibrary.org/b/id/${docs.cover_i}-M.jpg" class="w-100" alt="">
        </div>
        <!-- body -->
        <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
            <h3>${docs.title}</h3>
            <h6>author_name:${docs.author_name}</h6>
            <h6>First publish year:${docs.first_publish_year}</h6>
            <h6>Publish year:${docs.publish_year}</h6>
                
        </div>
    </div>
    <!-- repeating -->
        
        `;
        bookContainer.appendChild(div);
    });


}