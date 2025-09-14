package com.store.onlinestore.repository;

import com.store.onlinestore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByType(String type);
    List<Product> findByBrand(String brand);
    List<Product> findByBrandAndType(String brand, String type);
}
