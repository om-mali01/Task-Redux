import psycopg2

def create_connection():
    connection = psycopg2.connect(
        user='postgres',
        password='mysecretpassword',
        host='172.17.0.94',
        port='5432',
        database='Temp-Redux'
    )
    return connection

connection = create_connection()
cursor = connection.cursor()