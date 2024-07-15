import java.nio.file.Path;
import java.sql.*;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.Feature;

public class Importer {

    public static void main(String[] args) {
        long startTime = System.nanoTime();
        try {
            // Establish a connection to your PostgreSQL database
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");

            // JSON data obtained from your file parsing logic
            List<Passenger> passengers = ReadJSON.readJsonArray(Path.of("resource/passenger.json"), Passenger.class);
            List<Cards> cards = ReadJSON.readJsonArray(Path.of("resource/cards.json"), Cards.class);
            for(Cards c: cards){
                PreparedStatement pstmt = conn.prepareStatement(c.toString());
                pstmt.executeUpdate();
            }

            for (Passenger p: passengers){
                PreparedStatement pstmt = conn.prepareStatement(p.toString());
                pstmt.executeUpdate();
                pstmt.close();
            }
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    long endTime = System.nanoTime();
    long elapsedTime = endTime - startTime;
    double elapsedTimeSeconds = (double) elapsedTime / 1_000_000_000.0;
    System.out.println("Elapsed Time: " + elapsedTimeSeconds + " seconds");
    }
}

