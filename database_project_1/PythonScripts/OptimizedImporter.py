import psycopg2
from psycopg2.extras import execute_values  # Import the correct function
import json
import time

# Define connection parameters
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'cs307'
DB_USER = 'harroldtok'
DB_PASSWORD = '6969'

# Load JSON data (you can replace the sample data with actual JSON data)
with open('/Users/harroldtok/PycharmProjects/DataImport/ride.json') as f:
    rides = json.load(f)  # Ensure the JSON file is correctly formatted

# Start timer to measure execution time
start_time = time.time()

# Establish a connection to the PostgreSQL database
conn = psycopg2.connect(
    host='127.0.0.1',
    port=5432,
    dbname='cs307',
    user='harroldtok',
    password=6969
)

# Start a transaction block
conn.autocommit = False
try:
    # Prepare SQL queries
    sql1 = "INSERT INTO lab3.cardid_rides (user_code, start_station, end_station, price, start_time, end_time) VALUES %s"
    sql2 = "INSERT INTO lab3.userid_rides (user_id, start_station, end_station, price, start_time, end_time) VALUES %s"

    # Create prepared statements
    pstmt1 = conn.cursor()
    pstmt2 = conn.cursor()
    cursor = conn.cursor()

    cardid_rides = []
    userid_rides = []
    # Add batch insertions
    for r in rides:
        record = (r['user'], r['start_station'], r['end_station'], r['price'], r['start_time'], r['end_time'])
        if len(r['user']) == 9:
            cardid_rides.append(record)
        else:
            userid_rides.append(record)

        # Execute batch operations
    if cardid_rides:
        execute_values(cursor, sql1, cardid_rides)

    if userid_rides:
        execute_values(cursor, sql2, userid_rides)

        # Commit the transaction after successful batch execution
    conn.commit()

    # Close the prepared statements
    pstmt1.close()
    pstmt2.close()

except psycopg2.Error as e:
    # Rollback in case of errors
    print("An error occurred:", e)
    conn.rollback()

finally:
    # Ensure the connection is closed
    conn.close()

# Calculate elapsed time
end_time = time.time()
elapsed_time_seconds = end_time - start_time
print(f"Elapsed Time: {elapsed_time_seconds:.2f} seconds")
