export default async function getApi(endPoint) {
  try {
    const API_URL = endPoint;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result; // Return the fetched data
  } catch (error) {
    console.error(error);
    return null; // Return null in case of error
  }
}
