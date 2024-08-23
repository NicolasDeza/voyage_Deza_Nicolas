import "./style.scss";
import { app } from "./framework/app";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Voyages } from "./voyages/Voyages";
import { Voyage } from "./voyages/Voyage";
import { Panier } from "./pages/Panier";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/voyages": Voyages,
  "/voyage": Voyage,
  "/panier": Panier,
};

app("#app", routes);
