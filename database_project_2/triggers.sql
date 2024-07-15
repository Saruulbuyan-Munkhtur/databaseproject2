
DROP TRIGGER IF EXISTS validate_passenger_trigger ON passengers;
DROP FUNCTION IF EXISTS validate_passenger();
DROP TRIGGER IF EXISTS validate_station_bus_trigger ON station_buses;
DROP FUNCTION IF EXISTS validate_station_bus();
DROP TRIGGER IF EXISTS validate_card_trigger ON cards;
DROP FUNCTION IF EXISTS validate_card();
DROP TRIGGER IF EXISTS validate_line_trigger ON lines;
DROP FUNCTION IF EXISTS validate_line();
DROP TRIGGER IF EXISTS validate_station_trigger ON stations;
DROP FUNCTION IF EXISTS validate_station();
DROP TRIGGER IF EXISTS validate_userid_ride_trigger ON userid_rides;
DROP FUNCTION IF EXISTS validate_userid_ride();
DROP TRIGGER IF EXISTS validate_line_station_trigger ON lines_station;
DROP FUNCTION IF EXISTS validate_line_station();
-- New Passenger Validation
CREATE FUNCTION validate_passenger() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.name IS NULL OR
NEW.phone_number IS NULL OR
NEW.gender IS NULL OR
NEW.district IS NULL OR
NEW.id_number IS NULL THEN
RAISE EXCEPTION 'All passenger columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_passenger_trigger
BEFORE INSERT OR UPDATE ON passengers
FOR EACH ROW
EXECUTE FUNCTION validate_passenger();
-- Trigger for station bus
CREATE FUNCTION validate_station_bus() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.entrance IS NULL OR
NEW.bus_info IS NULL OR
NEW.bus_name IS NULL OR
NEW.station_name IS NULL OR
NEW.bus_id IS NULL THEN
RAISE EXCEPTION 'All station bus columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_station_bus_trigger
BEFORE INSERT OR UPDATE ON station_buses
FOR EACH ROW
EXECUTE FUNCTION validate_station_bus();
-- Trigger for cards
CREATE FUNCTION validate_card() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.money IS NULL OR
NEW.create_time IS NULL OR
NEW.code IS NULL THEN
RAISE EXCEPTION 'All card columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_card_trigger
BEFORE INSERT OR UPDATE ON cards
FOR EACH ROW
EXECUTE FUNCTION validate_card();
-- Trigger for lines
CREATE FUNCTION validate_line() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.line_name IS NULL OR
NEW.intro IS NULL OR
NEW.mileage IS NULL OR
NEW.color IS NULL OR
NEW.first_opening IS NULL OR
NEW.url IS NULL OR
NEW.start_time IS NULL OR
NEW.end_time IS NULL THEN
RAISE EXCEPTION 'All line columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_line_trigger
BEFORE INSERT OR UPDATE ON lines
FOR EACH ROW
EXECUTE FUNCTION validate_line();
-- Trigger for stations
CREATE FUNCTION validate_station() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.district IS NULL OR
NEW.intro IS NULL OR
NEW.chinese_name IS NULL OR
NEW.station_english_name IS NULL THEN
RAISE EXCEPTION 'All station columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_station_trigger
BEFORE INSERT OR UPDATE ON stations
FOR EACH ROW
EXECUTE FUNCTION validate_station();
-- Trigger for userid_rides
CREATE FUNCTION validate_userid_ride() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.ride_id IS NULL OR
NEW.user_id IS NULL OR
NEW.start_station IS NULL OR
NEW.end_station IS NULL OR
NEW.price IS NULL OR
NEW.start_time IS NULL OR
NEW.end_time IS NULL OR
NEW.status IS NULL THEN
RAISE EXCEPTION 'All userid ride columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_userid_ride_trigger
BEFORE INSERT OR UPDATE ON userid_rides
FOR EACH ROW
EXECUTE FUNCTION validate_userid_ride();
-- Trigger for line_station
CREATE FUNCTION validate_line_station() RETURNS TRIGGER AS $$
BEGIN
-- Check if all columns are not null
IF NEW.position IS NULL OR
NEW.status IS NULL OR
NEW.line_name IS NULL OR
NEW.station_name IS NULL THEN
RAISE EXCEPTION 'All line station columns must have a value';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER validate_line_station_trigger
BEFORE INSERT OR UPDATE ON lines_station
FOR EACH ROW
EXECUTE FUNCTION validate_line_station();