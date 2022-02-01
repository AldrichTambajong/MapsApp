import googlemaps,os,flask
from flask.json import jsonify
from pprint import pprint
from dotenv import load_dotenv
from dotenv.main import find_dotenv

load_dotenv(
    find_dotenv()
)

app = flask.Flask(__name__)

MAPS_KEY = os.getenv("MAPS_KEY")

map_client = googlemaps.Client(MAPS_KEY)

# dest1 = "3973 Ivy Gate Dr, Buford, GA"
# # All client requests are used if not commented out. Comment out for usage
# response = map_client.geocode(dest1) 
# response2 = map_client.distance_matrix("3973 Ivy Gate Dr", "1216 Wildwood Trace",units="imperial")
# pprint(response)

@app.route('/requestKey',methods=["GET","POST"])
def requestKey():
    key = {
        "accessKey": MAPS_KEY
    }
    return jsonify(key)


app.run(debug=True,host="0.0.0.0", port=int(os.environ.get("PORT", 6000)))