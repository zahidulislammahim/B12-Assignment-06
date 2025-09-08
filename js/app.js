const categoryList = document.getElementById("category-list");
const allTrees = document.getElementById("all-trees");
const cardContainer = document.getElementById("card-container");

// all trees Button
allTrees.addEventListener("click", () => {
fetch('https://openapi.programming-hero.com/api/plants')
  .then(res => res.json())
  .then(data => {
    const allTreesData = data.plants;
    // console.log(allTreesData);

    allTreesData.forEach(tree => {
      console.log(tree);
      const div = document.createElement('div');
      div.className = "bg-white p-4 rounded shadow";
      div.innerHTML =`
              <img src="${tree.image}" alt="Tree 1" class="w-full h-48 object-cover rounded mb-4 bg-gray-200"/>
              
              <h3 class="text-xl font-bold mb-2">
              ${tree.name}
              </h3>
             
              <p class="text-gray-700 mb-4">
                ${tree.description}
              </p>
              
              <div class="flex justify-between items-center mb-4">
                <p class="bg-[#DCFCE7] py-2 px-3 rounded-full">
                ${tree.category}
                </p>
                <p>
                  <i class="fa-solid fa-bangladeshi-taka-sign"></i
                  ><span class="font-bold">
                  ${tree.price}
                  </span>
                </p>
              </div>
              <button
                class="bg-[#15803D] text-white px-4 py-2 rounded-full hover:bg-[#0F7A2D] w-full">
                Add to Cart
              </button>
      `
      cardContainer.appendChild(div);
    });

  })
});


// all categories in the sidebar
const cards = () => {
   fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
    const categoryName = data.categories.map((cat) => cat.category_name);
     // console.log(categoryName);
    
      categoryName.forEach((name) => {
        // console.log(name);
        const li = document.createElement("li");

        li.className = "p-2 hover:bg-[#15803D] hover:text-white rounded";
        li.textContent = name;

        categoryList.appendChild(li);
      });
     })
     .catch((error) => console.log(error));
};
cards();
