package dgs1sdt.magpie.metrics.changeRfi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface MetricChangeRfiRepository extends JpaRepository<MetricChangeRfi, Long> {
  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'OPEN' AND " +
    "metric.rfiNum = ?1")
  MetricChangeRfi findStatusChangeToOpenByRfiNum(String rfiNum);

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'CLOSED' AND " +
    "metric.rfiNum = ?1")
  MetricChangeRfi findStatusChangeToClosedByRfiNum(String rfiNum);

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'CLOSED' AND " +
    "metric.datetime BETWEEN ?1 AND ?2")
  List<MetricChangeRfi> findStatusChangeToClosedBetweenDateRange(Date start, Date end);

  @Query("SELECT metric FROM MetricChangeRfi metric WHERE metric.field = 'status' AND metric.newData = 'OPEN'")
  List<MetricChangeRfi> findAllStatusChangeToOpen();
}
