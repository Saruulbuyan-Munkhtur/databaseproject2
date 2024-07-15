import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DifferentVolumes {
    public static void main(String[] args) throws SQLException {
        long startTime = System.nanoTime();

        try {
            // Establish a connection to your PostgreSQL database
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
            List<List<Ride>> seperatedFiles = new ArrayList<>();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //2 Sets Of 50000
            List<Ride> rides1 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_1.2.json"), Ride.class);
            List<Ride> rides2 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_2.2.json"), Ride.class);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //5 Sets Of 20000
//            List<Ride> rides1 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_1.json"), Ride.class);
//            List<Ride> rides2 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_2.json"), Ride.class);
//            List<Ride> rides3 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_3.json"), Ride.class);
//            List<Ride> rides4 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_4.json"), Ride.class);
//            List<Ride> rides5 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_5.json"), Ride.class);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //10 Sets Of 10000
//            List<Ride> rides1 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_1.1.json"), Ride.class);
//            List<Ride> rides2 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_2(1).json"), Ride.class);
//            List<Ride> rides3 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_3.1.json"), Ride.class);
//            List<Ride> rides4 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_4.1.json"), Ride.class);
//            List<Ride> rides5 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_5.1.json"), Ride.class);
//            List<Ride> rides6 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_6.1.json"), Ride.class);
//            List<Ride> rides7 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_7.1.json"), Ride.class);
//            List<Ride> rides8 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_8.1.json"), Ride.class);
//            List<Ride> rides9 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_9.1.json"), Ride.class);
//            List<Ride> rides10 = ReadJSON.readJsonArray(Path.of("resource/ride_volume_10.1.json"), Ride.class);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            seperatedFiles.add(rides1);
            seperatedFiles.add(rides2);
//            seperatedFiles.add(rides3);
//            seperatedFiles.add(rides4);
//            seperatedFiles.add(rides5);
//            seperatedFiles.add(rides6);
//            seperatedFiles.add(rides7);
//            seperatedFiles.add(rides8);
//            seperatedFiles.add(rides9);
//            seperatedFiles.add(rides10);

            for (int i = 0; i < seperatedFiles.size(); i++) {
                conn.setAutoCommit(false);
                String sql1 = "INSERT INTO lab3.cardid_rides (user_code, start_station, end_station, price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)";
                String sql2 = "INSERT INTO lab3.userid_rides (user_id, start_station, end_station, price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)";
                PreparedStatement pstmt1 = conn.prepareStatement(sql1);
                PreparedStatement pstmt2 = conn.prepareStatement(sql2);
                for (Ride r : seperatedFiles.get(i)) {
                    if (r.getUser().length() == 9) {
                        pstmt1.setString(1, r.getUser());
                        pstmt1.setString(2, r.getStartStation());
                        pstmt1.setString(3, r.getEndStation());
                        pstmt1.setDouble(4, r.getPrice());
                        pstmt1.setTimestamp(5, r.getStartTime());
                        pstmt1.setTimestamp(6, r.getEndTime());
                        pstmt1.addBatch();
                    } else {
                        pstmt2.setString(1, r.getUser());
                        pstmt2.setString(2, r.getStartStation());
                        pstmt2.setString(3, r.getEndStation());
                        pstmt2.setDouble(4, r.getPrice());
                        pstmt2.setTimestamp(5, r.getStartTime());
                        pstmt2.setTimestamp(6, r.getEndTime());
                        pstmt2.addBatch();
                    }
                }
                // Execute the batch
                pstmt1.executeBatch();
                pstmt2.executeBatch();
                conn.commit();
                conn.setAutoCommit(true);
                pstmt1.close();
                pstmt2.close();
            }
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        long endTime = System.nanoTime();
        long elapsedTime = endTime - startTime;
        double elapsedTimeSeconds = (double) elapsedTime / 1_000_000_000.0;
        System.out.println("Elapsed Time For 2 Seperated Volumes (50000): " + elapsedTimeSeconds + " seconds");
    }
}
