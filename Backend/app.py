import googlemaps,os,flask,json
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

@app.route('/requestKey',methods=["GET","POST"])
def requestKey():
    key = {
        "accessKey": MAPS_KEY
    }
    return jsonify(key)

@app.route('/directions', methods=["GET","POST"])
def directions():
    if flask.request.method == "POST":
        data = flask.request.get_json()
        response = map_client.directions(data.get("origin"),data.get("destination"),mode="driving")
        route = {
            "points": response[0]["overview_polyline"]["points"]
        }
        pprint(data.get("destination"))
        return jsonify(route)

if __name__ =="__main__":
    app.run(debug=True,host=os.getenv("IP","0.0.0.0"), port=int(os.environ.get("PORT", 6000)))