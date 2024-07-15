create table if not exists cards
(
    code        varchar(20)    not null
        primary key,
    money       numeric(10, 2) not null,
    create_time timestamp      not null
);

create table passengers
(
    id_number    varchar(20)  not null
        primary key,
    name         varchar(100) not null,
    phone_number varchar(20)
        unique,
    gender       varchar(10)  not null,
    district     varchar(50)  not null
);


create table stations
(
    station_english_name varchar(100) not null
        primary key
        unique,
    district             varchar(50)  not null,
    intro                text,
    chinese_name         varchar(100) not null
);

create table cardid_rides
(
    ride_id       serial
        primary key,
    user_code     varchar(100)   not null
        constraint fk_code_id
            references cards,
    start_station varchar(100)   not null
        constraint cardid_rides___fk
            references stations,
    end_station   varchar(100)   not null
        constraint cardid_rides___fk2
            references stations,
    price         numeric(10, 2) not null,
    start_time    timestamp      not null,
    end_time      timestamp      not null,
    status varchar(50) not null
    constraint cardid_unique
        unique (user_code, start_time)
);

create table lines
(
    line_name     varchar(100)     not null
        primary key
        unique,
    intro         text,
    mileage       double precision not null,
    color         varchar(50)      not null,
    first_opening date             not null,
    url           varchar(255),
    start_time    time,
    end_time      time
);

create table lines_station
(
    line_name    varchar not null
        references lines,
    station_name varchar not null
        references stations,
    primary key (line_name, station_name)
    position int not null,
    status varchar(50) not null
);


create table station_buses
(
    station_name varchar(100) not null
        constraint stationname_busesstationname_fk
            references stations,
    entrance     text         not null,
    bus_info     text,
    bus_name     varchar(50),
    bus_id       serial
        constraint station_buses_pk
            primary key
        unique,
    constraint unique_station_buses
        unique (station_name, entrance, bus_name, bus_info)
);

create table station_outinfo
(
    station_name varchar(50)  not null
        constraint fk_stations_outinfo_station_name
            references stations,
    entrance     varchar(255) not null,
    out_info     text,
    info_id      serial
        constraint station_outinfo_pk
            primary key
        unique,
    constraint unique_station_out_info
        unique (station_name, entrance, out_info)
);


create table userid_rides
(
    ride_id       serial
        primary key,
    user_id       varchar(100)   not null
        constraint fk_user_id
            references passengers,
    start_station varchar(100)   not null
        constraint userid_rides___fk
            references stations,
    end_station   varchar(100)   not null
        constraint userid_rides___fk2
            references stations,
    price         numeric(10, 2) not null,
    start_time    timestamp      not null,
    end_time      timestamp      not null,
    status varchar(50) not null
    constraint userid_unique
        unique (user_id, start_time)
);

