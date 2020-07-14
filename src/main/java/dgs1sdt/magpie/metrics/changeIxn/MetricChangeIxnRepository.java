package dgs1sdt.magpie.metrics.changeIxn;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MetricChangeIxnRepository extends JpaRepository<MetricChangeIxn, Long> {
  List<MetricChangeIxn> findByNewDataEquals(String status);
}
