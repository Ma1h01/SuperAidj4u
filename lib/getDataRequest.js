
export async function getData(url) {
  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });
    const data = await res.json()
    return data;
  } catch (error) {
    console.error(error);
  }
}

