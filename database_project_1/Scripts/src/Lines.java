import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.Feature;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.*;
import java.util.Arrays;
import java.util.Date;

public class Lines {
    private int x = 0;
    private int line_id;
    private String line_name;
    private String intro;
    private double mileage;
    private String color;
    private String date;
    private String url;
    private Time start_time;
    private Time end_time;

    private String stations;

    private String first_opening;

    public String getFirst_opening() {
        return first_opening;
    }

    public void setFirst_opening(String first_opening) {
        this.first_opening = first_opening;
    }

    public int getLine_id() {
        return line_id;
    }

    public void setLine_id(int line_id) {
        this.line_id = line_id;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getMileage() {
        return mileage;
    }

    public void setMileage(double mileage) {
        this.mileage = mileage;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Time getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Time end_time) {
        this.end_time = end_time;
    }

    public String getLine_name() {
        return line_name;
    }

    public void setLine_name(String line_name) {
        this.line_name = line_name;
    }

    public Time getStart_time() {
        return start_time;
    }

    public void setStart_time(Time start_time) {
        this.start_time = start_time;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getStations() {
        return stations;
    }

    public void setStations(String stations) {
        this.stations = stations;
    }

    public Lines(int line_id, String line_name, String intro, double mileage, String color, String first_opening, String url, Time start_time, Time end_time, String stations) {
        this.line_id = line_id;
        this.line_name = line_name;
        this.stations = stations;
        this.start_time = start_time;
        this.end_time = end_time;
        this.intro = intro;
        this.mileage = mileage;
        this.color = color;
        this.first_opening = first_opening;
        this.url = url;
    }

    @Override
    public String toString() {
        x++;
        return  "INSERT INTO lines (line_id, line_name, stations, start_time, end_time, intro, mileage, color, first_opening, url) VALUES ('" +
                line_name + "', '" +
                stations + "', '" +
                start_time + "', '" +
                end_time + "', '" +
                intro + "', '" +
                mileage + "', '" +
                color + "', '" +
                first_opening + "', '" +
                url + "')";
    }

    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
            String jsonStrings = Files.readString(Path.of("resource/lines.json"));
            JSONObject jsonObject = JSONObject.parseObject(jsonStrings, Feature.OrderedField);
            for (String lineName : jsonObject.keySet()) {
                String sql = "INSERT INTO test.lines (line_name, start_time, end_time, intro, mileage, color, first_opening, url) VALUES (?,?,?,?,?,?,?,?)";
                PreparedStatement pstmt = conn.prepareStatement(sql);
                JSONObject line = jsonObject.getJSONObject(lineName);
                String start = line.getString("start_time");
                String end = line.getString("end_time");
                String intro = line.getString("intro");
                double mileage = line.getDouble("mileage");
                String url = line.getString("url");
                String color = line.getString("color");
                Timestamp opening = (Timestamp) line.getTimestamp("first_opening");

                pstmt.setString(1, lineName);
                pstmt.setTime(2, Time.valueOf(start + ":00"));
                pstmt.setTime(3, Time.valueOf(end + ":00"));
                pstmt.setString(4, intro);
                pstmt.setDouble(5, mileage);
                pstmt.setString(6, color);
                pstmt.setTimestamp(7, opening);
                pstmt.setString(8, url);
                System.out.println(lineName);
                pstmt.executeUpdate();
            }
            conn.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
