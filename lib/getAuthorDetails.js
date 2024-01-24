import getPost from "./getPost";

export default async function getAuthorDetails(slug) {
    try {
      // Fetch the post to get the author ID
      const postResponse = await getPost(slug);
  
      // Extract author ID from the post
      const authorId = postResponse[0]?.author;
  
      if (!authorId) {
        throw new Error('Author ID not found.');
      }
  
      // Fetch author details using the author ID
      const authorResponse = await fetch(`https://www.channelionline.com/wp-json/wp/v2/users/${authorId}`, {
        cache: "no-store"
      });
  
      const authorDetails = await authorResponse.json();
      return authorDetails;
    } catch (error) {
      console.error('Error fetching author details:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }