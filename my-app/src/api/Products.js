export async function fetchProducts() {
  const resp = await fetch('https://fakestoreapi.com/products?limit=99');
  if (!resp.ok) throw new Error('خطا در دریافت محصولات');
  return await resp.json(); 
}
