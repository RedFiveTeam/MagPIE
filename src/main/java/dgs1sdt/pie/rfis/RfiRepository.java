package dgs1sdt.pie.rfis;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RfiRepository extends JpaRepository<Rfi, Long> {
  Rfi findByRfiNum(String rfiNum);
}
