import java.nio.file.Path;
import java.sql.*;
import java.util.List;

public class OptimizedImporter {
    public static void main(String[] args) throws SQLException {
        long startTime = System.nanoTime();

        try {
            // Establish a connection to your PostgreSQL database
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
            conn.setAutoCommit(false);

            // JSON data obtained from your file parsing logic
            //List<Cards> cards = ReadJSON.readJsonArray(Path.of("resource/cards.json"), Cards.class);
            List<Ride> rides = ReadJSON.readJsonArray(Path.of("resource/ride.json"), Ride.class);
           // String sql = "INSERT INTO lab3.cards (code, money, create_time) VALUES (?, ?, ?)";

            String sql1 = "INSERT INTO test.cardid_rides (user_code, start_station, end_station, price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)";
            String sql2 = "INSERT INTO test.userid_rides (user_id, start_station, end_station, price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt1 = conn.prepareStatement(sql1);
            PreparedStatement pstmt2 = conn.prepareStatement(sql2);
           // PreparedStatement pstmt = conn.prepareStatement(sql);

            //test optimized script on cards
//            for (Cards c: cards) {
//                pstmt.setString(1, c.getCode());
//                pstmt.setString(2, String.valueOf(c.getMoney()));
//                pstmt.setString(3, String.valueOf(c.getCreate_time()));
//            }
            for (Ride r: rides) {
                if(r.getUser().length() == 9){
                    pstmt1.setString(1, r.getUser());
                    pstmt1.setString(2, r.getStartStation());
                    pstmt1.setString(3, r.getEndStation());
                    pstmt1.setDouble(4, r.getPrice());
                    pstmt1.setTimestamp(5, r.getStartTime());
                    pstmt1.setTimestamp(6, r.getEndTime());
                    pstmt1.addBatch();
                } else{
                    pstmt2.setString(1, r.getUser());
                    pstmt2.setString(2, r.getStartStation());
                    pstmt2.setString(3, r.getEndStation());
                    pstmt2.setDouble(4, r.getPrice());
                    pstmt2.setTimestamp(5, r.getStartTime());
                    pstmt2.setTimestamp(6, r.getEndTime());
                    pstmt2.addBatch();
                }
            }
            pstmt1.executeBatch();
            pstmt2.executeBatch();
            conn.commit();
            conn.setAutoCommit(true);
            pstmt1.close();
            pstmt2.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        long endTime = System.nanoTime();
        long elapsedTime = endTime - startTime;
        double elapsedTimeSeconds = (double) elapsedTime / 1_000_000_000.0;
        System.out.println("Elapsed Time: " + elapsedTimeSeconds + " seconds");
    }
}
