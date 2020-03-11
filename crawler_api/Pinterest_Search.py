import pinterest
import requests


folderPath = "./Photos"
username = 'rozannaboczar'
# Initialize API by passing OAuth2 token
api = pinterest.Pinterest(token='AiY2GLdD735L3SbhqeeM-f0dmAMHFfmJH_NhtG9GlyfZs0CzGAhOgDAAACW5RpctZ_oA14QAAAAA')
image_database = []
# get_image(api, '303359724894021286')


def get_board(api):
    boards = api.boards()['data']
    target_board = {}
    for board in boards:
        print(board['name'])
        if board['name'] == "Slodkosci":
            target_board = board
    return target_board


def get_pins(api,target_board):
    pins = api.board(username+"/"+target_board['name']).pins().get()
    return pins


"""""
# zeby pobierac ze sugestii
def get_board_suggestions(api,id):
    api.suggest_boards()
"""


def update_images_database(pins, image_database):
    for pin in pins:
        #image_database.append(pin['id'])
        print(pin)
        print(pin['image'])
        download_image(pin['url'], folderPath)


def download_image(url, path):
    r = requests.get(url=url, stream=True)
    if r.status_code == 200:
        with open(path, 'wb') as f:
            for chunk in r.iter_content(1024):
                f.write(chunk)


def main():
    target_board = get_board(api)
    pins = get_pins(api, target_board)
    update_images_database(pins, image_database)


main()






