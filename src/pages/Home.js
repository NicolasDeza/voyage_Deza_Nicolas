import { CustomCarousel } from "../components/CustomCarousel";

export const Home = (element) => {
  const images = [
    {
      src: "carousel/imgDeux.jpg",
      title: "Beach",
      description: "Relax on a tropical Mallorca",
      alt: "Mallorca",
    },
    {
      src: "carousel/img.jpg",
      title: "Mallorca",
      description: "Nice blue beach",
      alt: "Beach",
    },
    {
      src: "carousel/imgTrois.jpg",
      title: "Airport",
      description:
        "Experience the vibrant nightlife in the city that never sleeps.",
      alt: "Airport",
    },
  ];

  element.innerHTML = `
    ${CustomCarousel(images)}
    <h1>Welcome to VoyageZen</h1>
    <p>This is the home page.</p>
  `;
};
