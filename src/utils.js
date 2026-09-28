/**
 * Reads cached board data from local storage.
 *
 * @param {string} key - The local storage key.
 * @returns {Array} Parsed stored data, or an empty array when no data exists.
 */
const getCachingData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export { getCachingData };
