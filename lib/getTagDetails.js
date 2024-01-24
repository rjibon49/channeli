import getPost from "./getPost";

export default async function getTagDetails(slug) {
  try {
    // Fetch the post to get the category IDs
    const postResponse = await getPost(slug);

    // Extract category IDs from the post
    const tagIds = postResponse[0]?.tags || [];

    if (tagIds.length === 0) {
      throw new Error('Tag IDs not found.');
    }

    // Fetch category details using the category IDs
    const tagDetailsPromises = tagIds.map(async (tagId) => {
      const tagResponse = await fetch(`https://www.channelionline.com/wp-json/wp/v2/tags/${tagId}`, {
        cache: "no-store"
      });
      return tagResponse.json();
    });

    const resolvedTagDetails = await Promise.all(tagDetailsPromises);
    return resolvedTagDetails;
  } catch (error) {
    console.error('Error fetching Tag details:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
}