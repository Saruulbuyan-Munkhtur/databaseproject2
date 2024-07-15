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

public class station_outinfo {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
            String jsonStrings = Files.readString(Path.of("resource/stations.json"));
            JSONObject jsonObject = JSONObject.parseObject(jsonStrings, Feature.OrderedField);
            for (String stationName : jsonObject.keySet()) {
                String sql = "INSERT INTO test.station_outinfo (station_name, entrance, out_info) VALUES (?, ?, ?)";
                PreparedStatement pstmt = conn.prepareStatement(sql);
                JSONObject station = jsonObject.getJSONObject(stationName);
                pstmt.setString(1, stationName);
                JSONArray outInfoArray = JSONArray.parseArray(station.getString("out_info"));

                for (Object outInfoObject : outInfoArray) {
                    JSONObject outInfo = (JSONObject) outInfoObject;
                    pstmt.setString(2, outInfo.getString("outt").trim());
                    String[] textt = outInfo.getString("textt").split("[、.,，  ]");
                    for (int i = 0; i < textt.length; i++) {
                        pstmt.setString(3, textt[i].trim());
                        if (!textt[i].trim().isEmpty()) {
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
                //System.out.println(pstmt);
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
