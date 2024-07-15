import json
from math import ceil

with open('ride.json', 'r') as file:
    data = json.load(file)

if isinstance(data, dict):
    data = list(data.values())

# Determine the number of volumes
chunk_size = 50000
num_volumes = ceil(len(data) / chunk_size)

# Split the data into volumes
for i in range(num_volumes):
    start = i * chunk_size
    end = start + chunk_size
    volume_data = data[start:end]
    
    # Save the volume data to a separate file
    volume_filename = f'ride_volume_{i + 1}.json'
    with open(volume_filename, 'w', encoding='utf-8') as volume_file:
        json.dump(volume_data, volume_file, ensure_ascii=False)