from statistics import mode
import googlemaps,os
from dotenv import load_dotenv,find_dotenv
load_dotenv(
    find_dotenv()
)
MAPS_KEY = os.getenv("MAPS_KEY")

map_client = googlemaps.Client(MAPS_KEY)
response = map_client.directions("3973 Ivy Gate Dr","1213 Wildwood Trce",mode="driving")
print (response[0]["overview_polyline"]["points"])
