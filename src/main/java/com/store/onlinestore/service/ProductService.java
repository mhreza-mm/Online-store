package com.store.onlinestore.service;

import com.store.onlinestore.entity.Product;
import com.store.onlinestore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> getProducts(String type, String brand, Pageable pageable) {
        if (type != null && brand != null) {
            return productRepository.findByBrandAndType(brand, type, pageable);
        } else if (type != null) {
            return productRepository.findByType(type, pageable);
        } else if (brand != null) {
            return productRepository.findByBrand(brand, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

    // متدهای CRUD قبلی همچنان می‌مونند
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);
        existing.setTitle(updatedProduct.getTitle());
        existing.setPrice(updatedProduct.getPrice());
        existing.setImage(updatedProduct.getImage());
        existing.setType(updatedProduct.getType());
        existing.setBrand(updatedProduct.getBrand());
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        productRepository.delete(getProductById(id));
    }
}
