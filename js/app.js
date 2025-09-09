const categoryList = document.getElementById("category-list");
const allTrees = document.getElementById("all-trees");
const cardContainer = document.getElementById("card-container");
const addToCardCon = document.getElementById("add-to-card-con");
const totalSum = document.getElementById("total-sum");

// all trees Button
allTrees.addEventListener("click", (e) => {
  const allLi = document.querySelectorAll("li");
  allLi.forEach((li) => {
    li.classList.remove("bg-[#15803D]", "text-white");
  });
  if (e.target.localName === "li") {
    e.target.classList.add(...["bg-[#15803D]", "text-white"]);
  }
  showLoading();
  allTreesFun();
});
// all trees function
const allTreesFun = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const allTreesData = data.plants;
      cardContainer.innerHTML = "";
      allTreesData.forEach((tree) => {
        // create a div for each tree Card
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow items-card";
        div.innerHTML = `
              <img src="${tree.image}" alt="Tree 1" class="w-full h-48 object-cover rounded mb-4 bg-gray-200"/>
              
              <h3 class="text-xl font-bold mb-2" onclick="showModal(${tree.id})">
              ${tree.name}  <i class="fa-solid fa-arrow-up-right-from-square opacity-10"></i>
              </h3>
             
              <p class="text-gray-700 mb-4">
                ${tree.description.slice(0, 100)}...
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
                class=" bg-[#15803D] text-white px-4 py-2 rounded-full hover:bg-[#0f7a2dd8] w-full">
                Add to Cart
              </button>`;
        cardContainer.appendChild(div);
      });
    });
};
allTreesFun(); // call the function to load all trees initially ----------------------

// all categories in the sidebar
const cards = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categoryName = data.categories.map((cat) => cat.category_name);
      const categorysId = data.categories.map((id) => id.id);
      categoryName.forEach((cat) => {
        const li = document.createElement("li");
        li.onclick = (e) => {
          const allLi = document.querySelectorAll("li");
          allLi.forEach((li) => {
            li.classList.remove("bg-[#15803D]", "text-white");
          });
          if (e.target.localName === "li") {
             e.target.classList.add(...["bg-[#15803D]", "text-white"]);
          }
          categorysId.forEach((categoryId, index) => {
            if (cat === categoryName[index]) {
              showcaragories(categoryId);
            }
          });
        };
        li.className = "p-2 hover:bg-[#15803D] hover:text-white rounded";
        li.textContent = cat;

        categoryList.appendChild(li);
      });
    })
    .catch((error) => console.log(error));
};
cards(); // call the function to load categories----------------------------------

// Add to cart button
const addToCard = (id, name, price) => {
  //  if item already exists
  const existingItem = document.getElementById(`cart-item-${id}`);

  if (existingItem) {
    const qtySpan = existingItem.querySelector(".item-qty");
    let qty = parseInt(qtySpan.innerText);
    qty++;
    qtySpan.innerText = qty;

  } else {
    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center mb-4 bg-[#F0FDF4] p-2 rounded-lg";
    div.id = `cart-item-${id}`;
    div.innerHTML = `
      <div>
        <h3>${name}</h3>
        <p class="text-gray-500">
          <i class="fa-solid fa-bangladeshi-taka-sign"></i>
          <span class="item-price">${price}</span>
          <span class="ml-2">Qty: <span class="item-qty">1</span></span>
        </p>
      </div>
      <i onclick="Delete(this, ${price}, ${id})" 
         class="fa-solid fa-circle-xmark hover:text-red-600 text-gray-500 text-2xl cursor-pointer"></i>
    `;
    addToCardCon.appendChild(div);
  }

  // update total sum
  const total = parseFloat(totalSum.innerText) + price;
  totalSum.innerText = total;
  alert(`${name} has been added to the cart`);
};

// Delete item from cart
const Delete = (element, price, id) => {
  const item = document.getElementById(`cart-item-${id}`);
  const qty = parseInt(item.querySelector(".item-qty").innerText);

  // remove item price from total sum
  const total = parseFloat(totalSum.innerText) - (price * qty);
  totalSum.innerText = total;

  // remove item from cart
  item.remove();
};


// show card with categories
const showcaragories = (id) => {
  showLoading();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML = "";
      const categoryTrees = data.plants;

      categoryTrees.forEach((tree) => {
        // create a div for each tree Card
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow items-card";
        div.innerHTML = `
        <img src="${tree.image}" alt="Tree 1" class="w-full h-48 object-cover rounded mb-4 bg-gray-200"/>
              
              <h3 class="text-xl font-bold mb-2" onclick="showModal(${tree.id})">
              ${tree.name}  <i class="fa-solid fa-arrow-up-right-from-square opacity-10"></i>
              </h3>
             
              <p class="text-gray-700 mb-4">
                ${tree.description.slice(0, 100)}...
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
                class=" bg-[#15803D] text-white px-4 py-2 rounded-full hover:bg-[#0f7a2dd8] w-full">
                Add to Cart
              </button>`;
        cardContainer.appendChild(div);
      });
    });
};
//   Loading Animation
const showLoading = () => {
  cardContainer.innerHTML = `
    <div class="flex justify-center items-center w-full h-64 col-span-full">
      <div class="loader">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  `;
};

// Modal function
// const showModal = (id) => {
//   fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
//   .then(res => res.json())
//   .then(data =>{
//   const tree = data.plants;
//   console.log(tree);
  
//   const modal = document.getElementById("openModal");
//   modal.style.display = "block";
//   const div =document.createElement("div");
//   div.innerHTML=`
//   <dialog id="my_modal_1" class="modal">
//         <div class="modal-box">
//           <h3 class="text-lg font-bold">${tree.name}</h3>
//           <img src="${tree.image}" alt="">
//           <p class="py-4"><span class="font-bold">Category:</span>${tree.category}</p>
//           <p class="py-4"><span class="font-bold">Price:</span><i class="fa-solid fa-bangladeshi-taka-sign"></i
//                   >${tree.price}</p>
//           <p class="py-4"><span class="font-bold">Description:</span>${tree.description}</p>
//           <div class="modal-action">
//             <form method="dialog">
//               <!-- if there is a button in form, it will close the modal -->
//               <button class="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//   `;
//   modal.appendChild(div);
// })
// .catch(error => console.log(error));
// }


const showModal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      const tree = data.plants; // এখানে plant আসবে, plants না

      // modal content set করা
      document.getElementById("modal-title").innerText = tree.name;
      document.getElementById("modal-img").src = tree.image;
      document.getElementById("modal-category").innerHTML = `<span class="font-bold">Category:</span> ${tree.category}`;
      document.getElementById("modal-price").innerHTML = `<span class="font-bold">Price:</span> <i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}`;
      document.getElementById("modal-description").innerHTML = `<span class="font-bold">Description:</span> ${tree.description}`;

      // modal open করো
      document.getElementById("my_modal_1").showModal();
    })
    .catch(error => console.log(error));
};