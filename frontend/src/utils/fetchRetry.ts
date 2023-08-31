const fetchRetry = async (attempts: number, url: string, options?: RequestInit): Promise<Response> => {
  try {
    return await fetch(url, options);
  } catch(err) {
    if (attempts === 1) throw err; // если попытки кончились
    return await fetchRetry(attempts - 1, url, options);
  }
}

export default fetchRetry;
