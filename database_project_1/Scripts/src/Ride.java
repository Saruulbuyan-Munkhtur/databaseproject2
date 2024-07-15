import java.sql.*;

public class Ride {
    private String user;
    private String startStation;
    private String endStation;
    private double price;
    private Timestamp startTime;
    private Timestamp endTime;

    public Ride(String user, String startStation, String endStation, double price, Timestamp startTime, Timestamp endTime) {
        this.user = user;
        this.startStation = startStation;
        this.endStation = endStation;
        this.price = price;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getStartStation() {
        return startStation;
    }

    public void setStartStation(String startStation) {
        this.startStation = startStation;
    }

    public String getEndStation() {
        return endStation;
    }

    public void setEndStation(String endStation) {
        this.endStation = endStation;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        String query = "";
        if(user.length() == 9){
            query = "INSERT INTO lab3.cardid_rides (user_code, start_station, end_station, price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)";
        } else{
            query = "INSERT INTO lab3.userid_rides (user_id, start_station, end_station, price, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?)";
        }

        try (Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/cs307", "harroldtok", "6969");
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setString(1, user);
            preparedStatement.setString(2, startStation);
            preparedStatement.setString(3, endStation);
            preparedStatement.setDouble(4, price);
            preparedStatement.setTimestamp(5, startTime);
            preparedStatement.setTimestamp(6, endTime);

            return preparedStatement.toString();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

}

