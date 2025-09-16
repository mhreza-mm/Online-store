package com.store.onlinestore.controller;

import com.store.onlinestore.dto.PaginationResponse;
import com.store.onlinestore.entity.Product;
import com.store.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/paginated")
    public PaginationResponse<Product> getProductsPaginated(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productService.getProducts(type, brand, search, pageable);

        return new PaginationResponse<>(
                productPage.getContent(),
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages()
        );
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService
                .getProducts(null, null, null, PageRequest.of(0, Integer.MAX_VALUE))
                .getContent();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return productService.updateProduct(id, updatedProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
