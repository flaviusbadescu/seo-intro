import { TPokemon } from "@/types/TPokemon";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Pokemons List",
  description: "A list of pokemons",
  openGraph: {
    title: "Pokemons List",
    description: "A list of pokemons",
    type: "website",
  },
  twitter: {
    title: "@handle",
    site: "@site",
    card: "summary_large_image",
  },
};

const Posts = async () => {
  const pokemons: TPokemon[] = await fetch(
    "https://pokeapi.co/api/v2/pokemon",
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .then((data) => data.results);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Post",
    name: "Pokemon List",
    description: "A list of pokemons",
  };

  return (
    <div className="flex flex-wrap gap-8">
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name} href={`/posts/${pokemon.name}`}>
          {pokemon.name}
        </Link>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Posts;
