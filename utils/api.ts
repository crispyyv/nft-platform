export const generateURI = (path: string) =>
  `http://95.163.12.156:8999/${path}`;

export const fetcher = (
  url: string,
  options?: RequestInit
): Promise<Record<any, any>> =>
  fetch(url, options)
    .then((resp) => resp.json())
    .then((data: Record<any, any>) => data)
    .catch((error) => {
      console.error("Error on fetch: ", error.message);
      return { error: "error on fetch" };
    });

export const sendPost = (url: string, body: Record<any, any>) =>
  fetcher(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const sendGet = (url: string) => fetcher(url);
