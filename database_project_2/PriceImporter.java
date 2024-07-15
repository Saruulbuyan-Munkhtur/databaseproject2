import scala.Int;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.Objects;

public class PriceImporter {

    public static void main(String[] args) throws SQLException {
        //Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "harroldtok", "6969");
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/database_project2", "root", "");

        String csvFile = "/Users/harroldtok/IdeaProjects/Database_Project1/resource/Price.csv";
        String end_station_line = "";
        String csvSplitBy = ",";
        int x = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
            end_station_line = br.readLine();
            String position = br.readLine();
            String end_station = br.readLine();
            String[] end_stations = end_station.split(","); //exit station name
            String[] end_stations_lines = end_station_line.split(","); //line of exit stations
            while (true) {
                String sql = "INSERT INTO price (start_station, end_station, price) VALUES (?, ?, ?);";
                PreparedStatement pstmt = conn.prepareStatement(sql);
                String row = br.readLine();
                if (row == null) {
                    break;
                } else {
                    String[] rows = row.split(",");
                    for (int i = 3; i < rows.length; i++) {
                        pstmt.setString(1, rows[2]);
                        pstmt.setString(2, end_stations[i - 3]);
                        pstmt.setString(3, rows[i]);
                        System.out.println(pstmt);
                        if(Objects.equals(end_stations_lines[i - 3], "6支号线")){
                            pstmt.setString(4, "6号线支线");
                        }
                        if(Objects.equals(rows[0], "6支号线")){
                            pstmt.setString(2, "6号线支线");
                        }
                        pstmt.executeUpdate();
                        x++;
                    }
                }
            }
            System.out.println(x);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
