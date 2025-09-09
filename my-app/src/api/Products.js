// src/api/Products.js
export const fetchProducts = async () => {
    try {
        const token = localStorage.getItem("token");
        let headers = token ? { "Authorization": `Bearer ${token}` } : {};

        // آدرس کامل بک‌اند
        const apiUrl = "http://localhost:8080/api/products";

        // درخواست اولیه با توکن (یا بدون)
        let res = await fetch(apiUrl, { headers });

        // اگر توکن مشکل داشت (401 یا 403)، دوباره بدون هدر درخواست بزن
        if (res.status === 401 || res.status === 403) {
            console.warn("توکن معتبر نیست یا منقضی شده، درخواست بدون احراز هویت ارسال شد");
            res = await fetch(apiUrl); // بدون هدر Authorization
        }

        if (!res.ok) {
            throw new Error(`خطا در دریافت محصولات: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // اگر داده خالی بود
        if (!data || data.length === 0) {
            console.warn("هیچ محصولی از بک‌اند برنگشت.");
        }

        return data;

    } catch (error) {
        console.error("خطا در fetchProducts:", error);
        return []; // برگرداندن آرایه خالی تا UI کرش نکند
    }
};
