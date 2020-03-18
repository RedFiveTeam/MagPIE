package dgs1sdt.magpie.rfis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RfiRepository extends JpaRepository<Rfi, Long> {
  Rfi findRfiById(Long id);
  Rfi findByRfiNum(String rfiNum);

  @Query("SELECT rfi FROM Rfi rfi WHERE rfi.status = 'CLOSED' AND rfi.receiveDate IS NOT NULL")
  List<Rfi> findAllClosedWithDefinedReceiveDate();
}
