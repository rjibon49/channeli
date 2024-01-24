export default async function getPost(slug) {
    const response = await fetch(`https://www.channelionline.com/wp-json/wp/v2/posts?slug=${slug}`, {
        cache: "no-store"
    });
    return await response.json();
  }