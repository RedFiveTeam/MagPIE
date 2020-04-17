package dgs1sdt.magpie.ixns;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IxnRepository extends JpaRepository<Ixn, Long> {
  List<Ixn> findAllByTargetId(long targetId);
  List<Ixn> findAllBySegmentId(long segmentId);

  @Query("SELECT ixn FROM Ixn ixn WHERE ixn.targetId = ?1 AND (ixn.status = 'IN_PROGRESS' OR ixn.status = 'COMPLETED')")
  List<Ixn> findAllInProgressOrCompleteByTargetId(long targetId);

  List<Ixn> findAllByRfiId(long rfiId);
}
