import java.time.LocalDateTime;

public class Passenger {
    private String id_number;
    private String name;
    private String phone_number;
    private String gender;
    private String district;

    public String getId_number(){return id_number;}
    public void setId_Number(String id_number) {
        this.id_number = id_number;
    }

    public String getName(){return name;}
    public void setName(String name) {
        this.name = name;
    }

    public String getPhone(){return phone_number;}
    public void setPhone(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getGender(){return gender;}
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDistrict(){return district;}
    public void setDistrict(String district) {
        this.district = district;
    }

    public Passenger(String id_number, String name, String phone_number, String gender, String district) {
        this.id_number = id_number;
        this.name = name;
        this.phone_number = phone_number;
        this.gender = gender;
        this.district = district;
    }

    @Override
    public String toString() {
        return  "INSERT INTO test.passengers (id_number, name, phone_number, gender, district) VALUES ('" +
                id_number + "', '" +
                name + "', '" +
                phone_number + "', '" +
                gender + "', '" +
                district + "')";
    }
}
