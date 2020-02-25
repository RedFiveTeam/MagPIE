package dgs1sdt.magpie.rfis;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RfiRepository extends JpaRepository<Rfi, Long> {
  Rfi findRfiById(Long id);
  Rfi findByRfiNum(String rfiNum);
}