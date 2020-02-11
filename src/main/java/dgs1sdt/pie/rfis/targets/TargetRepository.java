package dgs1sdt.pie.rfis.targets;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TargetRepository extends JpaRepository<Target, Long> {
  Target findByRfiIdAndExploitDateIdAndName(long rfiId, long exploitDateId, String name);
  List<Target> findAllByRfiId(long rfiId);
  List<Target> findAllByExploitDateId(long exploit);
}
