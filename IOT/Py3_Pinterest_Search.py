from py3pin.Pinterest import Pinterest
import requests
#niefajne bo testowe :(

download_dir = './Photos'

pinterest = Pinterest(email='rozanna.boczar@gmail.com',
                      password='miro2010',
                      username='Rozanna',
                      cred_root='./Photos')

#pinterest.login()

boards = pinterest.boards()
#print(boards[0]['pin_count'])
target_board = boards[0]
# get all pins for the board
board_pins = []
pin_batch = pinterest.board_feed(board_id=target_board['id'])
#print(target_board['name'])
for board in boards:
    print(board['name'])
'''
while len(pin_batch) > 0:
    board_pins += pin_batch
    pin_batch = pinterest.board_feed(board_id=target_board['id'])


# this can download images by url
def download_image(url, path):
    r = requests.get(url=url, stream=True)
    if r.status_code == 200:
        with open(path, 'wb') as f:
            for chunk in r.iter_content(1024):
                f.write(chunk)


# download each pin image in the specified directory
for pin in board_pins[1:]:
    #print(type(pin))
    print(pin)
    url = pin['url']
    index = str(url).rfind('.')
    extension = str(url)[index:]
    download_image(url, download_dir + pin['id'] + extension)

'''


