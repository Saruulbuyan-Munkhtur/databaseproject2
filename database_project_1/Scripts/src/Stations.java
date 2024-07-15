public class Stations {
    private String station_english_name;
    private String district;
    private String bus_info;
    private String out_info;
    private String intro;
    private String chinese_name;
    private int x = 0;

    public String getStation_english_name() {
        return station_english_name;
    }

    public void setStation_english_name(String station_english_name) {
        this.station_english_name = station_english_name;
    }

    public String getDistrict(){
        return district;
    }
    public void setDistrict(String district){
        this.district = district;
    }

    public String getBus_info() {
        return bus_info;
    }

    public void setBus_info(String bus_info) {
        this.bus_info = bus_info;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getOut_info() {
        return out_info;
    }

    public void setOut_info(String out_info) {
        this.out_info = out_info;
    }

    public String getChinese_name() {
        return chinese_name;
    }

    public void setChinese_name(String chinese_name) {
        this.chinese_name = chinese_name;
    }

    public Stations(String station_english_name, String district, String bus_info, String out_info, String intro, String chinese_name){
        this.station_english_name = station_english_name;
        this.district = district;
        this.bus_info = bus_info;
        this.out_info = out_info;
        this.intro = intro;
        this.chinese_name = chinese_name;
    }

    @Override
    public String toString() {
        x++;
        return  "INSERT INTO test.stations (station_id, station_english_name, district, bus_info, out_info, intro, chinese_name) VALUES ('" +
                x + "', '" +
                station_english_name + "', '" +
                district + "', '" +
                bus_info + "', '" +
                out_info + "', '" +
                intro + "', '" +
                chinese_name + "')";
    }
}
