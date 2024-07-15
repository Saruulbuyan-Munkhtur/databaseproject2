CREATE VIEW avg_travel_time AS
SELECT
    s.start_station AS "startStation",
    s.end_station AS "endStation",
    AVG(EXTRACT(EPOCH FROM (s.end_time - s.start_time))) / 60 AS "avgTravelTime"
FROM
    userid_rides s
    JOIN cardid_rides c ON s.ride_id = c.ride_id
GROUP BY
    s.start_station,
    s.end_station;

select * from avg_travel_time;


CREATE VIEW station_popularity AS
SELECT
    s.start_station AS "station",
    COUNT(*) AS "numberOfTrips"
FROM
    userid_rides s
    JOIN cardid_rides c ON s.ride_id = c.ride_id
GROUP BY
    s.start_station;

select * from station_popularity;

CREATE VIEW peak_hours AS
SELECT
    EXTRACT(HOUR FROM s.start_time) AS "hour",
    COUNT(*) AS "numberOfTrips"
FROM
    userid_rides s
    JOIN cardid_rides c ON s.ride_id = c.ride_id
GROUP BY
    EXTRACT(HOUR FROM s.start_time);

select * from peak_hours;
SELECT  "hour", "numberOfTrips" FROM "peak_hours" AS "PeakHours";

CREATE VIEW station_to_station_popularity AS
SELECT
    s.start_station AS "Start Station",
    s.end_station AS "End Station",
    COUNT(*) AS "Number of Trips"
FROM
    userid_rides s
    JOIN cardid_rides c ON s.ride_id = c.ride_id
GROUP BY
    s.start_station, s.end_station
ORDER BY
    "Number of Trips" DESC;