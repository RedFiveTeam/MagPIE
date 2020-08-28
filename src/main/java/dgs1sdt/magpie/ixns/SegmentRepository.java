package dgs1sdt.magpie.ixns;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SegmentRepository extends JpaRepository<Segment, Long> {
  List<Segment> findAllByTargetId(long targetId);
  List<Segment> findAllByDeletedIsNotNull();
}
