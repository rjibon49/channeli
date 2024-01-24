import getPost from "./getPost";

export default async function getCategoryDetails(slug) {
  try {
    // Fetch the post to get the category IDs
    const postResponse = await getPost(slug);

    // Extract category IDs from the post
    const categoryIds = postResponse[0]?.categories || [];

    if (categoryIds.length === 0) {
      throw new Error('Category IDs not found.');
    }

    // Fetch category details using the category IDs
    const categoryDetailsPromises = categoryIds.map(async (categoryId) => {
      const categoryResponse = await fetch(`https://www.channelionline.com/wp-json/wp/v2/categories/${categoryId}`, {
        cache: "no-store"
      });
      return categoryResponse.json();
    });

    const resolvedCategoryDetails = await Promise.all(categoryDetailsPromises);
    return resolvedCategoryDetails;
  } catch (error) {
    console.error('Error fetching Category details:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
}