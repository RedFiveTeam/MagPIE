package dgs1sdt.project.pie;

import dgs1sdt.project.pie.Interfaces.GetsClient;
import dgs1sdt.project.pie.gets.GetsService;
import dgs1sdt.project.pie.gets.StubGetsClient;
import dgs1sdt.project.pie.rfi.Rfi;
import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;

public class GetsServiceTest {
    GetsClient getsClient = new StubGetsClient();
    GetsService subject = new GetsService();

    @Test
    public void getRfi() throws Exception {

        assertEquals(
                Arrays.asList(
                        new Rfi(
                                "rfi_id1",
                                "priority1",
                                "gets_status1",
                                "info1",
                                "customer1",
                                "start1",
                                "end1",
                                "rfi_status1",
                                "exploited_coi1",
                                "tracks1"
                        ),
                        new Rfi(
                                "rfi_id2",
                                "priority2",
                                "gets_status2",
                                "info2",
                                "customer2",
                                "start2",
                                "end2",
                                "rfi_status2",
                                "exploited_coi2",
                                "tracks2"
                        ),
                        new Rfi(
                                "rfi_id3",
                                "priority3",
                                "gets_status3",
                                "info3",
                                "customer3",
                                "start3",
                                "end3",
                                "rfi_status3",
                                "exploited_coi3",
                                "tracks3"
                        )
                ),
                subject.getRfis(getsClient.getRfis())
        );
    }
}
