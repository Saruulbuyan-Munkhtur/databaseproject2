import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.parser.Feature;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.PreparedStatement;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

public class mongoImporter {
    public static void main(String[] args) {
        try {
            CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
                    CodecRegistries.fromCodecs(new StringArrayCodec()), // Register custom codec
                    MongoClientSettings.getDefaultCodecRegistry()
            );

            //Custom BSON codec to deserialize arrays for MongoDB
            MongoClientSettings settings = MongoClientSettings.builder()
                    .codecRegistry(codecRegistry)
                    .applyToClusterSettings(builder ->
                            builder.hosts(Arrays.asList(new ServerAddress("localhost", 27017))))
                    .build();

            MongoClient mongoClient = MongoClients.create(settings);

            MongoDatabase database = mongoClient.getDatabase("project1_bonus");

            // Get a reference to the "users" collection
            //MongoCollection<Document> collectionCards = database.getCollection("Cards");
            //MongoCollection<Document> collectionOutInfo = database.getCollection("station_outinfo");
            //MongoCollection<Document> collectionStation = database.getCollection("Stations");
            //MongoCollection<Document> collectionBuses = database.getCollection("station_buses");
            //MongoCollection<Document> collectionLines = database.getCollection("Lines");
            //MongoCollection<Document> collectionPassenger = database.getCollection("Passengers");
            //MongoCollection<Document> collectionLS = database.getCollection("lines_stations");
            //List<Cards> cards = ReadJSON.readJsonArray(Path.of("resource/cards.json"), Cards.class);
            //List<Ride> rides = ReadJSON.readJsonArray(Path.of("resource/ride.json"), Ride.class);
            //List<Passenger> passengers = ReadJSON.readJsonArray(Path.of("resource/passenger.json"), Passenger.class);
            //List<Stations> stations = ReadJSON.readJsonArray(Path.of("resource/stations.json"), Stations.class);
            //ist<Lines> lines = ReadJSON.readJsonArray(Path.of("resource/lines.json"), Lines.class);


            //String jsonStrings = Files.readString(Path.of("resource/lines.json"));
            //String jsonStrings = Files.readString(Path.of("resource/stations.json"));
            //JSONObject jsonObject = JSONObject.parseObject(jsonStrings, Feature.OrderedField);

//            for (String lineName: jsonObject.keySet()){
//                JSONObject line = jsonObject.getJSONObject(lineName);
//                Document document = new Document()
//                        .append("line_name", lineName)
//                        .append("start_time", line.getString("start_time"))
//                        .append("end_time", line.getString("end_time"))
//                        .append("intro", line.getString("intro"))
//                        .append("mileage", line.getString("mileage"))
//                        .append("color", line.getString("color"))
//                        .append("first_opening", line.getString("first_opening"))
//                        .append("url", line.getString("url"));
//                collectionLines.insertOne(document);
//            }


//            for (String stationName : jsonObject.keySet()) {
//                JSONObject station = jsonObject.getJSONObject(stationName);
//                Document document = new Document()
//                        .append("station_name", stationName)
//                        .append("district", station.getString("district"))
//                        .append("intro", station.getString("intro"))
//                        .append("chinese_name", station.getString("chinese_name"));
//                collectionStation.insertOne(document);
//            }
//            for (String stationName : jsonObject.keySet()) {
//                JSONObject station = jsonObject.getJSONObject(stationName);
//                JSONArray busInfoArray = JSONArray.parseArray(station.getString("bus_info"));
//                for (Object busInfoObject : busInfoArray) {
//                    JSONObject busInfo = (JSONObject) busInfoObject;
//                    JSONArray busOutInfoArray = busInfo.getJSONArray("busOutInfo");
//                    for (Object busOutObject : busOutInfoArray) {
//                        JSONObject busOutInfo = (JSONObject) busOutObject;
//                        String[] buslines = busOutInfo.getString("busInfo").split("、");
//                        Document document = new Document()
//                                .append("station_name", stationName)
//                                .append("entrance", busInfo.getString("chukou"))
//                                .append("bus_name", busOutInfo.getString("busName"))
//                                .append("bus_info", Arrays.toString(buslines));
//
//                        collectionBuses.insertOne(document);
//                    }
//                }
//            }

//            for (String stationName : jsonObject.keySet()) {
//                JSONObject station = jsonObject.getJSONObject(stationName);
//                JSONArray outInfoArray = JSONArray.parseArray(station.getString("out_info"));
//
//                for (Object outInfoObject : outInfoArray) {
//                    JSONObject outInfo = (JSONObject) outInfoObject;
//                    Document document = new Document()
//                            .append("station_name", stationName)
//                            .append("out_info", outInfo.getString("outt").trim())
//                            .append("info", outInfo.getString("textt").split("、"));
//                    collectionOutInfo.insertOne(document);
//                }
//            }
//            for (String lineName : jsonObject.keySet()) {
//                JSONObject line = jsonObject.getJSONObject(lineName);
//                JSONArray stationsArray = JSONArray.parseArray(line.getString("stations"));
//                for(Object stationName: stationsArray){
//                    Document document = new Document()
//                    .append("line_name", lineName)
//                    .append("station_name", stationName);
//
//                // Insert the document into the collection
//                collectionLS.insertOne(document);
//                }
//            }
//            for (Cards c: cards){
//            Document document = new Document()
//                    .append("code", c.getCode())
//                    .append("money", c.getMoney())
//                    .append("create_time", c.getCreate_time());
//
//                // Insert the document into the collection
//                collectionCards.insertOne(document);
//            }
//            for (Passenger p: passengers){
//            Document document = new Document()
//                    .append("id_number", p.getId_number())
//                    .append("name", p.getName())
//                    .append("phone_number", p.getPhone())
//                    .append("gender", p.getGender())
//                    .append("district", p.getDistrict());
//
//                // Insert the document into the collection
//                collectionPassenger.insertOne(document);
//            }
//            MongoCollection<Document> collection1 = database.getCollection("cardid_rides");
//            MongoCollection<Document> collection2 = database.getCollection("userid_rides");
//
//            for (Ride r : rides) {
//                if(r.getUser().length() == 9){
//                    Document document = new Document()
//                            .append("user_code", r.getUser())
//                            .append("start_station", r.getStartStation())
//                            .append("end_station", r.getEndStation())
//                            .append("price", r.getPrice())
//                            .append("start_time", r.getStartTime())
//                            .append("end_time", r.getEndTime());
//                    collection1.insertOne(document);
//                } else{
//                    Document document = new Document()
//                            .append("user_code", r.getUser())
//                            .append("start_station", r.getStartStation())
//                            .append("end_station", r.getEndStation())
//                            .append("price", r.getPrice())
//                            .append("start_time", r.getStartTime())
//                            .append("end_time", r.getEndTime());
//                    collection2.insertOne(document);                }
//            }


            System.out.println("Document inserted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
