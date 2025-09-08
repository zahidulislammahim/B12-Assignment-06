const categoryList = document.getElementById("category-list");
const allTrees = document.getElementById("all-trees");
const cardContainer = document.getElementById("card-container");
const addToCardCon = document.getElementById("add-to-card-con");
const totalSum = document.getElementById("total-sum");


// all trees Button in catagory
allTrees.addEventListener("click", () => {
  allTreesFun();
});

const allTreesFun = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const allTreesData = data.plants;
      // console.log(cardCategories);

      allTreesData.forEach((tree) => {
        // create a div for each tree Card
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow ";
        div.innerHTML = `
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
              <button onclick="addToCard(${tree.id}, '${tree.name}', ${tree.price})"
                class=" bg-[#15803D] text-white px-4 py-2 rounded-full hover:bg-[#0F7A2D] w-full">
                Add to Cart
              </button>`;
        cardContainer.appendChild(div);
      });
    });
};
allTreesFun(); // call the function to load all trees initially ----------------------

// all category fetch and display
const allCategory = () => {
  fetch("https://openapi.programming-hero.com/api/category/1")
    .then((res) => res.json())
    .then((data) => {
      const allTreesData = data.plants;
      console.log(allTreesData);

    })
    .catch((error) => console.log(error));
  }

// all categories in the sidebar
const cards = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categoryName = data.categories.map((cat) => cat.category_name);
      categoryName.forEach((name) => {
        const li = document.createElement("li");
        li.className = "p-2 hover:bg-[#15803D] hover:text-white rounded";
        li.textContent = name;

        categoryList.appendChild(li);
      });
    })
    .catch((error) => console.log(error));
};
cards(); // call the function to load categories----------------------------------


// Add to cart button 
const addToCard = (id, name, price) => {
  const div = document.createElement("div");
  div.className =
    "flex justify-between items-center mb-4 bg-[#F0FDF4] p-2 rounded-lg";
  div.innerHTML = `
      <div id="${id}">
        <h3>
          ${name}
        </h3>
        <p class="text-gray-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i>
        <span>
        ${price}
        </span>
        <i class="fa-solid fa-xmark "></i><span>1</span></p>
      </div>
        <i onclick="Delete(this, ${price})" class="fa-solid fa-circle-xmark hover:text-red-600 text-gray-500 text-2xl"></i>
  `
addToCardCon.appendChild(div);
  // update total sum
  const total = parseFloat(totalSum.innerText) + price;
  totalSum.innerText = total;
}

  // Delete item from cart
const Delete = (element, price) => {
  console.log(element, price);
  element.parentElement.remove();
  
  // update total sum after delete
  const total = parseFloat(totalSum.innerText) - price;
  totalSum.innerText = total;
}