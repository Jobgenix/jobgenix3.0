import json
import sqlite3
import os

db_path = 'jobgenix.db'
degrees_json_path = os.path.join('data', 'degrees.json')

# Connect to the database (create if not exists)
conn = sqlite3.connect(db_path)
c = conn.cursor()

# Create the degrees table if it doesn't exist
c.execute('''
CREATE TABLE IF NOT EXISTS degrees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    field TEXT NOT NULL
)
''')

# Load degrees from JSON
with open(degrees_json_path) as f:
    degrees = json.load(f)

# Get existing IDs
c.execute('SELECT id FROM degrees')
existing = set(row[0] for row in c.fetchall())

inserted = 0
for d in degrees:
    id, name, field = d['id'], d['name'], d['field']
    if id not in existing:
        c.execute('INSERT INTO degrees (id, name, field) VALUES (?, ?, ?)', (id, name, field))
        inserted += 1

conn.commit()
conn.close()

print(f'Inserted {inserted} new degrees.') 