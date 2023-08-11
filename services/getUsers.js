export default async function getUsers() {
    // Replace this with actual API call or data retrieval logic
    const response = await fetch('https://api.rarible.org/v0.1/collections/all');
    const data = await response.json();
    return  data.collections;
  }