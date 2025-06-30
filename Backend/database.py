from psycopg_pool import AsyncConnectionPool

conn_string = "host=172.17.0.94 user=postgres password=mysecretpassword dbname=Temp-Redux port=5432"

#here we are creating DB connection pool, where every api will get the separate connection from the pool

class DBConnectionPool:
    def __init__(self):
        self.async_pool = AsyncConnectionPool(
            conninfo=conn_string,
            min_size=4,  #this means atleast 4 db connections will be always ready even if there is no request without waiting to new connection
            max_size=10, #pool can have up to 10 simultaneous connections.
            open=False   #Don’t open pool yet util the app starts
        )

    #this will open the pool after app starts
    async def open(self):
        await self.async_pool.open()

    #this will close the pool
    async def close(self):
        await self.async_pool.close()
