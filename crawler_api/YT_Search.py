from youtube_api import YouTubeDataAPI
import json


class YTSearch:

    def __init__(self):
        self.api_key = 'AIzaSyC1GsiEj0D0zcQAyayaaCNa8oXeh9vU2bw'
        self.yt = YouTubeDataAPI(self.api_key)

    def get_playlists(self, key_word):  # key_word = co wyszukiwac czy spokojne czy jakies do rozruszenia XD
        playlists_ids = []
        playlists_links = []
        if self.yt.verify_key():
            results = self.yt.search(parser=None, q=key_word, max_results=5, search_type="playlist")
            #print(results)
            for result in results:
                playlists_ids.append(result['id']['playlistId'])
                playlists_links.append("https://www.youtube.com/playlist?list="+result['id']['playlistId'])
        return playlists_ids, playlists_links

    def get_videos_from_playlist(self, playlists_ids):
        videos_ids = []
        videos_links = []
        for ids in playlists_ids:
            videos = self.yt.get_videos_from_playlist_id(playlist_id=ids)
            for video in videos:
                videos_links.append("https://www.youtube.com/watch?v="+video['video_id'])
                videos_ids.append(video['video_id'])
        #unikalne wartosci:
        videos_links = set(videos_links)
        videos_ids = set(videos_ids)
        return videos_ids, videos_links

#TODO : add counter ??? zeby user mial niepowtarzajace sie dane
    def update(self, key_word): #odświerzanie danych raz na 24 h
        #zapisz jako plik
        if key_word == "high": # puls za wysoki, dla uspokojenia
            playlists_ids, playlists_links = self.get_playlists("calm music")  # wypluwa id playlist i linki do nich
            videos_ids, videos_links = self.get_videos_from_playlist(playlists_ids) #linki do muzyki z danej playlisty
            print(videos_links)
            print(videos_ids)
            data = {'YT_data_high': []}
            for ids, link in zip(videos_ids, videos_links):
                 data['YT_data_high'].append({
                     'video_id' : ids,
                     'video_link' : link
                 })
            print(len(data['YT_data_high']))
            with open('Data/YT_data_high.txt', 'w') as outfile:
                 json.dump(data, outfile)
        elif key_word == "low": # puls za niski, dla rozruszania
            playlists_ids, playlists_links = self.get_playlists("hard rock")  # wypluwa id playlist i linki do nich
            videos_ids, videos_links = self.get_videos_from_playlist(playlists_ids)  # linki do muzyki z danej playlisty
            print(videos_links)
            print(videos_ids)
            data = {'YT_data_low': []}
            for ids, link in zip(videos_ids, videos_links):
                data['YT_data_low'].append({
                    'video_id': ids,
                    'video_link': link
                })
            print(len(data['YT_data_low']))
            with open('Data/YT_data_low.txt', 'w') as outfile:
                json.dump(data, outfile)

yt = YTSearch()
yt.update("high")
yt.update("low")
    # def choose_resuls(self):
    # #     print("wylosowanie 3 muzyczek ")
    # #
    # # def get_response(self, pulse): # to bedziemy wywolywac!!!!
    # #     response = []
    # #     if pulse <= 60:
    # #         print("za niski puls!")
    # #     if pulse >= 85:
    # #         print("za wysoki puls!!")
    # #     if 60 < pulse < 85:
    # #         print("Puls idealny :3 !")
    # #     return response

"""""
chcemy 3 piosenki spokojne i rock!!!! 
ROZDZIELIĆ WYBOR CALM I ROCK I ZAPIS


from youtube_search import YoutubeSearch
import json

results = YoutubeSearch('calm music', max_results=100).to_dict()

for result in results:
  print("https://www.youtube.com"+result['link'])
"""""