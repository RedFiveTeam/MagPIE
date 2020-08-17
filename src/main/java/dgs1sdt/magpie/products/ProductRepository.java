package dgs1sdt.magpie.products;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  Product findByRfiId(long rfiId);
}
