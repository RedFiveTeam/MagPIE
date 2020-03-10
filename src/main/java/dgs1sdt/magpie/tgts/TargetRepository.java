package dgs1sdt.magpie.tgts;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TargetRepository extends JpaRepository<Target, Long> {
  Target findByRfiIdAndExploitDateIdAndName(long rfiId, long exploitDateId, String name);
  List<Target> findAllByRfiId(long rfiId);
  List<Target> findAllByExploitDateId(long exploit);
  List<Target> findAllByRfiIdAndName(long rfiId, String name);
}
