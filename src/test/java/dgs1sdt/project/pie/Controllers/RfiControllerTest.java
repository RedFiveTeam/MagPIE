package dgs1sdt.project.pie.Controllers;

import dgs1sdt.project.pie.BaseIntegrationTest;
import dgs1sdt.project.pie.rfi.RFIController;
import dgs1sdt.project.pie.rfi.RfiModel;
import dgs1sdt.project.pie.rfi.RfiRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;
//import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.equalTo;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RfiControllerTest extends BaseIntegrationTest {

    @Autowired
    private RfiRepository rfiRepository;

    @Test
    public void rfiTest() {

        rfiRepository.save(new RfiModel(
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
        ));

        given()
                .port(port)
                .when()
                .get(RFIController.URI + "/rfis")
                .then()
                .statusCode(200)
                .body("[0].rfi_id", equalTo("priority1"));

    }






//    @LocalServerPort
//    private int port;
//
//    @Autowired
//    private TestRestTemplate restTemplate;
//
//    @Autowired
//    private RfiRepository rfiRepository;
//
//    @Test
//    public void getRfi() throws Exception {
//        RfiModel rfiModel = new RfiModel("1", "19-320","Open","Request 5 compounds during week of 12 OCT 19 to 17 OCT 19","AOB West","10/12/19","10/17/19","Exploitation complete track production in progress","6/6", "9/14");
//        rfiRepository.save(rfiModel);
//        assertThat(
//                this.restTemplate.getForObject("http://localhost:" + port + "/api/rfis", String.class))
//                .contains("19-320");
//    }
//
//    @Test
//    public void hibernateAndSpringWiredCorrectly() {
//        RfiModel rfiModel = new RfiModel("1", "19-320","Open","Request 5 compounds during week of 12 OCT 19 to 17 OCT 19","AOB West","10/12/19","10/17/19","Exploitation complete track production in progress","6/6", "9/14");
//        rfiRepository.save(rfiModel);
//        RfiModel found = rfiRepository.findAll().get(0);
//
//        assertThat(found.getRfi_id()).isEqualTo(rfiModel.getRfi_id());
//    }
}
