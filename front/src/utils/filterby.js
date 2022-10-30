export const filterby = (products, value, prop) => {
  if (value === "all") return products;
  if (prop === "categories") {
    let prodfilt = products.filter((p) => p.data[prop].includes(value));
    return prodfilt;
  }
  let prodfilt = products.filter((p) => p.data[prop] === value);
  return prodfilt;
};
