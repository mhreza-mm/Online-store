package com.store.onlinestore.service;

import com.store.onlinestore.entity.Product;
import com.store.onlinestore.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public List<Product> getAllProducts(){
        return productRepository.findAll();

    }
    public Product getProductById(Long id){
        return productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Product not found"));
    }
    public Product createProduct(Product product){
        return productRepository.save(product);
    }
    public Product updateProduct(Long id,Product updatedProduct){
        Product existing=productRepository.findById(id)
                        .orElseThrow(()->new RuntimeException("Product not found with ID "+id));
        existing.setTitle(updatedProduct.getTitle());
        existing.setPrice(updatedProduct.getPrice());
        existing.setImage(updatedProduct.getImage());
        return productRepository.save(existing);
    }
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }


}
