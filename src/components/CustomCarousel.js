import { Carousel as BootstrapCarousel } from "bootstrap";

export const CustomCarousel = (images) => {
  return `
      <div id="carouselExampleCaptions" class="carousel slide w-100" style="margin-bottom: 100px;" data-bs-ride="carousel">
        <div class="carousel-indicators">
          ${images
            .map(
              (image, index) => `
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" ${
                index === 0 ? 'class="active" aria-current="true"' : ""
              } aria-label="Slide ${index + 1}"></button>
          `
            )
            .join("")}
        </div>
        <div class="carousel-inner">
          ${images
            .map(
              (image, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img src="${image.src}" class="d-block w-100" alt="${
                image.description
              }">
              <div class="carousel-caption d-none d-md-block">
                <h5>${image.title}</h5>
                <p>${image.description}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
};
