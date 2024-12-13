import { TPokemon } from "@/types/TPokemon";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type TPokemonItem = {
  name: string;
  sprites: {
    front_default: string;
  };
};

export async function generateStaticParams() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();

    return data.results.map((post: TPokemon) => ({
      slug: post.name,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const pokemon: TPokemonItem = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${slug}`
  ).then((res) => res.json());

  return {
    title: pokemon.name,
    description: `This is a post about ${pokemon.name}`,
    openGraph: {
      title: pokemon.name,
      description: `This is a post about ${pokemon.name}`,
      type: "article",
      url: `https://example.com/posts/${slug}`,
      images: [pokemon.sprites.front_default],
    },
    twitter: {
      title: "@handle",
      site: "@site",
      card: "summary_large_image",
      images: [pokemon.sprites.front_default],
    },
  };
}

const Post = async ({ params }: Props) => {
  const { slug } = await params;

  const pokemon: TPokemonItem = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${slug}`
  ).then((res) => res.json());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Post",
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    description: `This is a post about ${pokemon.name}`,
  };

  return (
    <div className="flex flex-col m-auto">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={420}
        height={420}
        priority
      />
      <h1>{pokemon.name}</h1>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Post;
