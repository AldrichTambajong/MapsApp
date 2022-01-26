import googlemaps,os
from pprint import pprint
from dotenv import load_dotenv
from dotenv.main import find_dotenv

load_dotenv(
    find_dotenv()
)

MAPS_KEY = os.getenv("MAPS_KEY")

map_client = googlemaps.Client(MAPS_KEY)

dest1 = "3973 Ivy Gate Dr, Buford, GA"
# All client requests are used if not commented out. Comment out for usage
response = map_client.geocode(dest1) 
response2 = map_client.distance_matrix("3973 Ivy Gate Dr", "1216 Wildwood Trace",units="imperial")
pprint(response)



