package dgs1sdt.magpie.metrics.changeIxn;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

import java.util.List;

public interface MetricChangeIxnRepository extends JpaRepository<MetricChangeIxn, Long> {
  List<MetricChangeIxn> findByNewDataEquals(String status);
}
