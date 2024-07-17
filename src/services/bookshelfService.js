// src/services/bookshelfService.js

export const fetchBookshelves = async () => {
  try {
    const response = await fetch("/bookshelves.json"); // Assuming my JSON file is in the public directory
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookshelves: ", error);
    return [];
  }
};
