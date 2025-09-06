export async function fetchProducts() {
    const resp = await fetch('http://localhost:8080/api/products');
    if (!resp.ok) throw new Error('خطا در دریافت محصولات');
    return await resp.json();
}
