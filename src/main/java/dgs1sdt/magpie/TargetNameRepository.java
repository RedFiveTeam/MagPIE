package dgs1sdt.magpie;

import dgs1sdt.magpie.tgts.TargetName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TargetNameRepository extends JpaRepository<TargetName, Long> {
  @Query("SELECT tgtName FROM TargetName tgtName WHERE tgtName.mgrs = ?1")
  TargetName findByMgrs(String mgrs);
}
