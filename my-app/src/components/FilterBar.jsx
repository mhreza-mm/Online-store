import React, { useState, useEffect } from "react";
import "../style/FilterBar.css";

export default function FilterBar({ products, onFilter }) {
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");

    useEffect(() => {
        if (products && products.length) {
            const uniqueTypes = [...new Set(products.map((p) => p.type))];
            setTypes(uniqueTypes);
        }
    }, [products]);

    useEffect(() => {
        if (selectedType) {
            const filteredBrands = [
                ...new Set(
                    products
                        .filter((p) => p.type === selectedType)
                        .map((p) => p.brand)
                ),
            ];
            setBrands(filteredBrands);
            setSelectedBrand("");
        } else {
            setBrands([]);
        }
    }, [selectedType, products]);

    useEffect(() => {
        onFilter(selectedType, selectedBrand);
    }, [selectedType, selectedBrand, onFilter]);

    return (
        <div className="filter-bar">
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
            >
                <option value="">نوع محصول</option>
                {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                disabled={!selectedType}
            >
                <option value="">برند</option>
                {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                ))}
            </select>
        </div>
    );
}
