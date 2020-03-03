package dgs1sdt.magpie.ixns;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IxnRepository extends JpaRepository<Ixn, Long> {
  public List<Ixn> findAllByTargetId(long targetId);
  public List<Ixn> findAllBySegmentId(long segmentId);
}
