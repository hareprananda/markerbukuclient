export const requestBuku = async () => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/buku`
  );
  data = await data.json();

  return data;
};
export const requestSingleMarker = async (id) => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/marker/buku/${id}`
  );
  data = await data.json();
  return data;
};

export const requestSummary = async () => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER__NODE_ENDPOINT}/summary`
  );
  data = data.json();
  return data;
};
