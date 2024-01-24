export default async function getAllPosts() {
    const response = await fetch("https://www.channelionline.com/wp-json/wp/v2/posts", {
        next: { revalidate: 300 },
    });
    return await response.json();
  }