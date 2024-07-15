import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.Feature;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class lines_stations {
    public static void main(String[] args) {
        int x = 0;
        try {
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
            String jsonStrings = Files.readString(Path.of("resource/lines.json"));
            JSONObject jsonObject = JSONObject.parseObject(jsonStrings, Feature.OrderedField);
            for (String lineName : jsonObject.keySet()) {
                JSONObject line = jsonObject.getJSONObject(lineName);
                JSONArray stationsArray = JSONArray.parseArray(line.getString("stations"));
                for(Object stationName: stationsArray){
                String sql = "INSERT INTO test.lines_station (line_name, station_name) VALUES (?,?)";
                PreparedStatement pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, lineName);
                pstmt.setString(2, (String) stationName);
                pstmt.executeUpdate();
                }
            }
            conn.close();
            System.out.println(x);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
