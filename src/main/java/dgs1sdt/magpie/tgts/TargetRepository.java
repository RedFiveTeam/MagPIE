package dgs1sdt.magpie.tgts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TargetRepository extends JpaRepository<Target, Long> {
  @Query("SELECT tgt FROM Target tgt WHERE tgt.rfiId = ?1 AND tgt.exploitDateId = ?2 AND tgt.name = ?3 AND tgt" +
    ".deleted IS NULL")
  Target findByRfiIdAndExploitDateIdAndName(long rfiId, long exploitDateId, String name);

  @Query("SELECT tgt FROM Target tgt WHERE tgt.rfiId = ?1 AND tgt.deleted IS NULL")
  List<Target> findAllByRfiId(long rfiId);

  @Query("SELECT tgt FROM Target tgt WHERE tgt.exploitDateId = ?1 AND tgt.deleted IS NULL")
  List<Target> findAllByExploitDateId(long exploitDateId);

  @Query("SELECT tgt FROM Target tgt WHERE tgt.exploitDateId = ?1 AND tgt.deleted IS NOT NULL")
  List<Target> findAllByExploitDateIdAndDeletedIsNotNull(long exploitDateId);

  @Query("SELECT tgt FROM Target tgt WHERE tgt.rfiId = ?1 AND tgt.name = ?2 AND tgt.deleted IS NULL")
  List<Target> findAllByRfiIdAndName(long rfiId, String name);
}
