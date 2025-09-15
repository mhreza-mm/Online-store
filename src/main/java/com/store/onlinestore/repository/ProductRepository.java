package com.store.onlinestore.repository;

import com.store.onlinestore.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByType(String type, Pageable pageable);
    Page<Product> findByBrand(String brand, Pageable pageable);
    Page<Product> findByBrandAndType(String brand, String type, Pageable pageable);
}
