import pandas as pd
from pymongo import MongoClient
from http import client
from sklearn.neighbors import NearestNeighbors
from bson import ObjectId

# mongo db credentials
client = MongoClient(
    'mongodb+srv://dbuser:hello123@cluster0.wvyarrx.mongodb.net/?retryWrites=true&w=majority')


def getSimilarEvents(event):
    mydb = client['test']
    users = mydb.users
    events = mydb.events
    ratings = mydb.ratings

    user_ids = []
    event_ids = []
    for i in users.find().sort("_id"):
        user_ids.append(str(i['_id']))
    for i in events.find().sort("_id"):
        event_ids.append(str(i['_id']))

    user_rating_map = dict()  # key: user, val: list of ratings

    for i in user_ids:
        # init with 0 ratings for all events
        user_rating_map[i] = [0 for _ in range(len(event_ids))]

    for i in ratings.find():
        user_id = str(i['user'])
        event_id = str(i['event'])
        event_index = event_ids.index(event_id)
        rating = i['ratingVal']
        user_rating_map[user_id][event_index] = rating
    
    df = pd.DataFrame(user_rating_map, index=event_ids)
    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(df.values)
    distances, indices = knn.kneighbors(df.values, n_neighbors=4)
    index_user_likes = df.index.tolist().index(event)
    sim_events = indices[index_user_likes].tolist()
    event_distances = distances[index_user_likes].tolist()
    id_event = sim_events.index(index_user_likes)    

    sim_events.remove(index_user_likes)
    event_distances.pop(id_event)

    return [df.index[i] for i in sim_events]
