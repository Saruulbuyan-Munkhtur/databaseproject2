import com.alibaba.fastjson.JSON;

import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;

public class CsvImporter {
    public static void main(String[] args) throws SQLException {
        long startTime = System.nanoTime();
        //List<Cards> cards = readJsonArray(Path.of("resource/cards.json"), Cards.class);
        List<Ride> rides = readJsonArray(Path.of("resource/ride.json"), Ride.class);
        String header1 = "user_code, start_station, end_station, price, start_time, end_time";
        String header2 = "user_id, start_station, end_station, price, start_time, end_time";

            try {
                //BufferedWriter writer = Files.newBufferedWriter(Path.of("resource/cards.csv"));
                FileWriter writerCode = new FileWriter("/Users/harroldtok/Desktop/user_code.csv", true);
                FileWriter writeruserId = new FileWriter("/Users/harroldtok/Desktop/user_id.csv", true);

                writerCode.write(header1);
                writerCode.append("\n");
                writeruserId.write(header2);
                writeruserId.append("\n");
                for (Ride r: rides) {
                    if(r.getUser().length() == 9){
                        String[] data1 = {r.getUser(), r.getStartStation(), r.getEndStation(), String.valueOf(r.getPrice()), String.valueOf(r.getStartTime()), String.valueOf(r.getEndTime())};
                        writerCode.write(String.join(",", data1));
                        writerCode.append("\n");
                    } else{
                        String[] data2 = {r.getUser(), r.getStartStation(), r.getEndStation(), String.valueOf(r.getPrice()), String.valueOf(r.getStartTime()), String.valueOf(r.getEndTime())};
                        writeruserId.write(String.join(",", data2));
                        writeruserId.append("\n");
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        String csvFilePath = "/Users/harroldtok/IdeaProjects/Database_Project1/resource/cards.csv";
        //String csvFilePathCode = "/Users/harroldtok/Desktop/user_code.csv";
        //String csvFilePathUserId = "/Users/harroldtok/Desktop/user_id.csv";

        try (Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
             Statement stmt = conn.createStatement()) {
            System.out.println("CSV data imported successfully.");
            String sql = "COPY lab3.cards FROM '" + csvFilePath + "' WITH (FORMAT CSV, HEADER TRUE)";
            stmt.execute(sql);
        }

        long endTime = System.nanoTime();
        long elapsedTime = endTime - startTime;
        double elapsedTimeSeconds = (double) elapsedTime / 1_000_000_000.0;
        System.out.println("Elapsed Time: " + elapsedTimeSeconds + " seconds");
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
