package dgs1sdt.pie.rfis.targets;

import org.junit.Test;

import java.sql.Timestamp;
import java.util.Date;

import static org.junit.Assert.*;

public class TargetTest {

  @Test
  public void compareReturnsFieldsThatAreDifferent() {
    Target target1 = new Target(
      1, 1, 1,
      "SDT20-123",
      "12QWE1231231231",
      "Notes",
      "Description"
    );

    TargetJson target2 = new TargetJson(
      1, 1,
      "SDT20-123",
      "12QWE1231231231",
      "Notes",
      "Description"
    );

    String[] expected = {};
    assertArrayEquals(expected, target1.Compare(target2).toArray());


    target2 = new TargetJson(
1, 1,
      "SDT20-123",
      "12QWE1231231231",
      "New Notes",
      "New Description"
    );

    expected = new String[]{"notes", "description"};
    assertArrayEquals(expected, target1.Compare(target2).toArray());

    target2 = new TargetJson(
1, 1,
      "SDT21-123",
      "12QWE1231231232",
      "",
      ""
    );

    expected = new String[]{"name", "mgrs", "notes", "description"};
    assertArrayEquals(expected, target1.Compare(target2).toArray());
  }

}
