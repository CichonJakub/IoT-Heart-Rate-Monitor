import random
from youtube_api import YouTubeDataAPI
import numpy as np


class YTSearch:

    def __init__(self):
        self.api_key = 'AIzaSyCYdB0Tcsw6xkYqaD8be3BYGlG9Ca7glUk'
        self.yt = YouTubeDataAPI(self.api_key)

    def get_videos(self, key_words):  # key_word = co wyszukiwac czy spokojne czy jakies do rozruszenia
        videos_ids = []
        for k in key_words:
            if self.yt.verify_key():
                results = self.yt.search(parser=None, q=k, max_results=round(200/len(key_words)), type="videos", videoEmbeddable="true")
                for result in results:
                    videos_ids.append(result['id']['videoId'])
        np.unique(videos_ids)
        random.shuffle(videos_ids)
        #print("Zaleziono: "+str(len(videos_ids)))
        # print("Id")
        # print(videos_ids)
        return videos_ids

    def update(self, key_word):
        result = []
        low = ["calm music", "sad music"]
        high = ["hard rock music", 'dance music 90s']
        #print("Searching for: "+key_word)
        if key_word == "high": # puls za wysoki, dla uspokojenia
            videos_ids = self.get_videos(low)  # wypluwa id playlist i linki do nich
            result = videos_ids

        elif key_word == "low": # puls za niski, dla rozruszania
            videos_ids = self.get_videos(high)  # wypluwa id playlist i linki do nich
            result = videos_ids

        return result
