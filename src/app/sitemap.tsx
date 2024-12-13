import { TPokemon } from "@/types/TPokemon";
import { MetadataRoute } from "next";

const WEBSITE_HOST_URL = "https://example.com";

enum ChangeFrequency {
  always = "always",
  hourly = "hourly",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
  never = "never",
}

const defaultRoutes = ["/", "/posts"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pokemons: TPokemon[] = await fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data) => data.results);

  const posts = pokemons.map((pokemon) => ({
    url: `${WEBSITE_HOST_URL}/proiecte/${pokemon.name}`,
    lastModified: new Date(),
    changeFrequency: ChangeFrequency.weekly,
    priority: 0.5,
  }));

  const routes = defaultRoutes.map((route) => ({
    url: `${WEBSITE_HOST_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: ChangeFrequency.weekly,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
