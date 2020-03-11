from youtube_api import YouTubeDataAPI

api_key = 'AIzaSyC1GsiEj0D0zcQAyayaaCNa8oXeh9vU2bw'
yt = YouTubeDataAPI(api_key)


def get_playlists():
    playlists_ids = []
    if yt.verify_key():
        results = yt.search(parser=None, q="bts", max_results=10, search_type="playlist")
        #print(results)
        for result in results:
            playlists_ids.append(result['id']['playlistId'])
            #print(result['id']['playlistId'])
    return playlists_ids


def get_videos_from_playlist(playlist_id):
    videos_ids = []
    videos = yt.get_videos_from_playlist_id(playlist_id=playlist_id)
    for video in videos:
        videos_ids.append("https://www.youtube.com/watch?v="+video['video_id'])
    return videos_ids


playlists = get_playlists()
videos = get_videos_from_playlist(playlists[0]) #linki do muzyki z danej playlisty

"""""
from youtube_search import YoutubeSearch
import json

results = YoutubeSearch('calm music', max_results=100).to_dict()

for result in results:
  print("https://www.youtube.com"+result['link'])
"""""