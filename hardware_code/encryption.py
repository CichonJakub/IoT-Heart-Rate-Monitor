from base64 import b64decode
from base64 import b64encode
import nacl.secret
import nacl.utils
from nacl.secret import SecretBox

def encrypt_my_pulse(pulse):
    pulse = pulse.encode('utf-8')
    key = b'BKg4kwwjXOe57iMhtBb2B3oakMP4z6xE'
    nonce = nacl.utils.random(nacl.secret.SecretBox.NONCE_SIZE)
    box = nacl.secret.SecretBox(key)
    encrypted = box.encrypt(pulse, nonce)
    ciphertext = b64encode(encrypted).decode('utf-8')
    print(ciphertext)
    return ciphertext

#encrypt_my_pulse('70.9')