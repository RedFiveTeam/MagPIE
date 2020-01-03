package dgs1sdt.pie.rfis;

import org.junit.Test;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class RfiTest {
  @Test
  public void canSortByDescendingDate() {
    Rfi rfiOld = new Rfi();
    Rfi rfiMiddle = new Rfi();
    Rfi rfiNew = new Rfi();
    rfiOld.setLastUpdate(new Timestamp(new Date(123456789).getTime()));
    rfiMiddle.setLastUpdate(new Timestamp(new Date(345678912).getTime()));
    rfiNew.setLastUpdate(new Timestamp(new Date(567891234).getTime()));
    List<Rfi> rfiList = new ArrayList<>();
    rfiList.add(rfiMiddle);
    rfiList.add(rfiOld);
    rfiList.add(rfiNew);
    Collections.sort(rfiList, new SortByRecentFirst());
    assert(rfiList.get(0).equals(rfiNew));
    assert(rfiList.get(1).equals(rfiMiddle));
    assert(rfiList.get(2).equals(rfiOld));
  }

  @Test
  public void sortByPriority() {
    Rfi rfiFirst = new Rfi();
    Rfi rfiSecond = new Rfi();
    Rfi rfiThird = new Rfi();
    rfiFirst.setPriority(1);
    rfiSecond.setPriority(2);
    rfiThird.setPriority(3);
    List<Rfi> rfiList = new ArrayList<>();
    rfiList.add(rfiSecond);
    rfiList.add(rfiThird);
    rfiList.add(rfiFirst);
    rfiList.sort(new SortByAscendingPriority());
    assert(rfiList.get(0).equals(rfiFirst));
    assert(rfiList.get(1).equals(rfiSecond));
    assert(rfiList.get(2).equals(rfiThird));
  }
}
