package dgs1sdt.pie.metrics.changeTarget;

import dgs1sdt.pie.rfis.targets.Target;
import dgs1sdt.pie.rfis.targets.TargetJson;
import org.junit.Test;

import java.sql.Timestamp;
import java.util.Date;

import static org.junit.Assert.*;

public class MetricChangeTargetTest {
  @Test
  public void createsMetricsBasedOnField() throws Exception {
    Target target1 = new Target(
      1, 1, 1,
      "SDT20-123",
      "12QWE1231231231",
      "Notes",
      "Description"
    );

    TargetJson target2 = new TargetJson(
      1, 1,
      "SDT20-124",
      "12QWE1231231230",
      "New Notes",
      "New Description"
    );

    Timestamp now = new Timestamp(new Date().getTime());

    MetricChangeTarget metric1 = new MetricChangeTarget(now, "name", target1, target2);
    MetricChangeTarget metric2 = new MetricChangeTarget(now, "mgrs", target1, target2);
    MetricChangeTarget metric3 = new MetricChangeTarget(now, "notes", target1, target2);
    MetricChangeTarget metric4 = new MetricChangeTarget(now, "description", target1, target2);

    assertEquals("name", metric1.getField());
    assertEquals("SDT20-123", metric1.getOldData());
    assertEquals("SDT20-124", metric1.getNewData());

    assertEquals("mgrs", metric2.getField());
    assertEquals("12QWE1231231231", metric2.getOldData());
    assertEquals("12QWE1231231230", metric2.getNewData());

    assertEquals("notes", metric3.getField());
    assertEquals("Notes", metric3.getOldData());
    assertEquals("New Notes", metric3.getNewData());

    assertEquals("description", metric4.getField());
    assertEquals("Description", metric4.getOldData());
    assertEquals("New Description", metric4.getNewData());

  }

}
