// import { articles } from "./articles.js";
console.log(import.meta.env);
const response = await fetch(import.meta.env.VITE_API_URL);
const articles = await response.json();
console.log(articles);

const colors = [
  {
    bgColor: "#F9F5FF",
    textColor: "#6941C6",
  },
  {
    bgColor: "#EEF4FF",
    textColor: "#3538CD",
  },
  {
    bgColor: "#FDF2FA",
    textColor: "#C11574",
  },
];

const container = document.querySelector("#container");
container.innerHTML = "";

articles.forEach((article, index) => {
  const articleWrapper = document.createElement("div");
  articleWrapper.classList.add("border", "shadow-md");
  const articleHref = document.createElement("a");
  articleHref.classList.add("h-full", "w-full");
  articleHref.href = `article-details.html?id=${article.id}`;

  const articleImage = document.createElement("img");
  articleImage.src = article.imagepath;
  articleImage.alt = article.imagealt;
  articleImage.classList.add("object-cover", "w-full", "h-80");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("p-4");

  switch (index) {
    case 0:
      articleWrapper.classList.add("lg:row-span-2");
      break;
    case 1:
      articleHref.classList.add("md:flex");
      articleImage.classList.add("lg:h-40", "lg:w-40");
      contentContainer.classList.add("overflow-hidden");
      break;
    case 2:
      articleHref.classList.add("md:flex");
      articleImage.classList.add("lg:h-40", "lg:w-40");
      contentContainer.classList.add("overflow-hidden");
      break;
    case 3:
      articleWrapper.classList.add("lg:col-span-2", "lg:w-full");
      break;
  }

  contentContainer.innerHTML = `
                <span class="text-sm font-semibold text-[#6941C6]">${
                  article.author
                } - ${article.date}</span>
                <h1 class="text-xl font-bold mt-4">${article.title}</h1>
                <p class="mt-4">${article.teaser}</p>
                <ul class="flex flex-wrap gap-2 mt-4">
                <!-- DRY Principle -->
                  ${article.tags
                    .split(",")
                    .map(
                      (tag, index) =>
                        `<li><span class="px-2 py-1 rounded text-sm mr-2 bg-[${colors[index].bgColor}] text-[${colors[index].textColor}]">${tag}</span></li>`
                    )
                    .join("")}
                  </ul>`;

  articleHref.appendChild(articleImage);
  articleHref.appendChild(contentContainer);
  articleWrapper.appendChild(articleHref);
  container.appendChild(articleWrapper);
});
