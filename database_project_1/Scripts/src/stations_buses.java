import com.alibaba.fastjson.JSON;
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
import java.util.*;

public class stations_buses {
    public static void main(String[] args) {

        try {
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
            String jsonStrings = Files.readString(Path.of("resource/stations.json"));
            JSONObject jsonObject = JSONObject.parseObject(jsonStrings, Feature.OrderedField);
            for (String stationName : jsonObject.keySet()) {
                String sql = "INSERT INTO test.station_buses (station_name, entrance, bus_name, bus_info) VALUES (?, ?, ?, ?)";
                PreparedStatement pstmt = conn.prepareStatement(String.valueOf(sql));
                JSONObject station = jsonObject.getJSONObject(stationName);
                JSONArray busInfoArray = JSONArray.parseArray(station.getString("bus_info"));
                pstmt.setString(1, stationName);
                for (Object busInfoObject : busInfoArray) {
                    JSONObject busInfo = (JSONObject) busInfoObject;
                    pstmt.setString(2, busInfo.getString("chukou"));
                    JSONArray busOutInfoArray = busInfo.getJSONArray("busOutInfo");
                    for (Object busOutObject : busOutInfoArray) {
                        JSONObject busOutInfo = (JSONObject) busOutObject;
                       String bus = busOutInfo.getString("busInfo").replaceAll("[、.,，  ();；]", ",");
                        String[] buslines = bus.split(",");
                        pstmt.setString(3, busOutInfo.getString("busName"));
                        for (int i = 0; i < buslines.length; i++) {
                        pstmt.setString(4, buslines[i].trim());
                            if (!buslines[i].trim().isEmpty()) {
                                System.out.println(pstmt);
                                try{
                                pstmt.executeUpdate();
                                } catch (SQLException e) {
                                    if (e.getSQLState().equals("23505")) {
                                        System.out.println("Duplicate entry");
                                    } else {
                                        throw e;
                                    }
                                }
                            }
                        }
                    }
                }
                pstmt.close();
            }
            conn.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private static <T> List<T> readJsonArray(Path path, Class<T> clz) {
        try {
            String jsonStrings = Files.readString(path);
            return JSON.parseArray(jsonStrings, clz);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
