CREATE ROLE superuser WITH
  LOGIN
  SUPERUSER
  PASSWORD 'superuser_password';

CREATE ROLE simple_customer WITH
  LOGIN
  PASSWORD 'customer_password';

GRANT SELECT ON ALL TABLES IN SCHEMA public TO simple_customer;

DO
$$
DECLARE
    view_record RECORD;
BEGIN
    FOR view_record IN
        SELECT table_name
        FROM information_schema.views
        WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
    LOOP
        EXECUTE 'GRANT SELECT ON ' || quote_ident(view_record.table_name) || ' TO simple_customer';
    END LOOP;
END
$$;

-- Grant privileges on cardid_rides table
GRANT SELECT, INSERT, UPDATE ON cardid_rides TO simple_customer;

-- Grant privileges on userid_rides table
GRANT SELECT, INSERT, UPDATE ON userid_rides TO simple_customer;

GRANT SELECT, INSERT, UPDATE ON cards TO simple_customer;
