import React, { useState, useEffect } from "react";
import "../style/FilterBar.css";

export default function FilterBar({ products, onFilter }) {
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    // پر کردن لیست نوع محصول بر اساس محصولات فعلی
    useEffect(() => {
        if (products && products.length) {
            const uniqueTypes = [...new Set(products.map(p => p.type))];
            setTypes(uniqueTypes);
        }
    }, [products]);

    // پر کردن برندها بر اساس نوع انتخاب شده
    useEffect(() => {
        if (selectedType) {
            const filteredBrands = [
                ...new Set(products.filter(p => p.type === selectedType).map(p => p.brand))
            ];
            setBrands(filteredBrands);

            // اصلاح: فقط برند رو خالی کن اگه دیگه وجود نداره
            setSelectedBrand(prev =>
                filteredBrands.includes(prev) ? prev : ""
            );
        } else {
            setBrands([]);
        }
    }, [selectedType, products]);

    // اطلاع به والد برای اعمال فیلتر سمت سرور
    useEffect(() => {
        onFilter(selectedType, selectedBrand);
    }, [selectedType, selectedBrand]); // ⬅ وابستگی products حذف شد

    const clearFilters = () => {
        setSelectedType("");
        setSelectedBrand("");
        onFilter("", "");
    };

    return (
        <div className="market-menu right-align">
            <span className="market-title">فیلتر محصولات</span>

            <div className="filter-dropdown">
                {/* ستون نوع محصول */}
                <div className="filter-section">
                    <h4>نوع محصول</h4>
                    <ul>
                        {types.map(type => (
                            <li
                                key={type}
                                className={selectedType === type ? "active" : ""}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ستون برند */}
                <div className="filter-section">
                    <h4>برند</h4>
                    <ul>
                        {brands.map(brand => (
                            <li
                                key={brand}
                                className={selectedBrand === brand ? "active" : ""}
                                onClick={() => setSelectedBrand(brand)}
                            >
                                {brand}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* دکمه حذف فیلتر */}
                <button onClick={clearFilters} className="clear-filters-btn">
                    حذف فیلترها
                </button>
            </div>
        </div>
    );
}
