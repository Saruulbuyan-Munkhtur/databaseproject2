import psycopg2
from psycopg2 import sql
import time
import json

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
    sql1 = "INSERT INTO lab3.cardid_rides (user_code, start_station, end_station, price, start_time, end_time) VALUES (%s, %s, %s, %s, %s, %s)"
    sql2 = "INSERT INTO lab3.userid_rides (user_id, start_station, end_station, price, start_time, end_time) VALUES (%s, %s, %s, %s, %s, %s)"

    # Create prepared statements
    pstmt1 = conn.cursor()
    pstmt2 = conn.cursor()

    # Add batch insertions
    for r in rides:
        if len(r['user']) == 9:
            pstmt1.execute(sql1, (r['user'], r['start_station'], r['end_station'], r['price'], r['start_time'], r['end_time']))
        else:
            pstmt2.execute(sql2, (r['user'], r['start_station'], r['end_station'], r['price'], r['start_time'], r['end_time']))

    # Commit the transaction
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
