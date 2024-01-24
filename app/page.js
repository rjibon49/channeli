import getAllPosts from "@/lib/getAllPosts";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const allPosts = await getAllPosts();
  return (
    <main>
      <div className="container mx-auto">
        <h2 className="text-white">Welcome to my home page</h2>
          <div className="flex flex-wrap">
            {allPosts.map((item) => (
              <div key={item.id} className="w-3/12 p-5">
                <Link href={`/posts/${item.slug}`}>
                  <Image src={item.featured_image_src} alt="" width={500} height={500} quality={80} className="imageThumb"/>
                  <h2 className="text-white">{item.title.rendered}</h2>
                </Link>
              </div>
            )).slice(0,10)}
          </div>
      </div>
    </main>
  );
}



// All News https://www.channelionline.com/wp-json/wp/v2/posts
// Lead News https://www.channelionline.com/wp-json/wp/v2/posts?categories=42282