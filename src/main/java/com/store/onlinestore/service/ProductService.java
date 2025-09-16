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

    public Page<Product> getProducts(String type, String brand, String search, Pageable pageable) {
        boolean hasSearch = (search != null && !search.trim().isEmpty());
        boolean hasType = (type != null && !type.trim().isEmpty());
        boolean hasBrand = (brand != null && !brand.trim().isEmpty());

        if (hasBrand && hasType && hasSearch) {
            return productRepository.findByBrandAndTypeAndTitleContainingIgnoreCase(brand, type, search, pageable);
        } else if (hasBrand && hasType) {
            return productRepository.findByBrandAndType(brand, type, pageable);
        } else if (hasBrand && hasSearch) {
            return productRepository.findByBrandAndTitleContainingIgnoreCase(brand, search, pageable);
        } else if (hasType && hasSearch) {
            return productRepository.findByTypeAndTitleContainingIgnoreCase(type, search, pageable);
        } else if (hasBrand) {
            return productRepository.findByBrand(brand, pageable);
        } else if (hasType) {
            return productRepository.findByType(type, pageable);
        } else if (hasSearch) {
            return productRepository.findByTitleContainingIgnoreCase(search, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }

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
