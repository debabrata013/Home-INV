import sys
from core.auth import generate_hash

pwd = sys.argv[1]
hashed_pwd = generate_hash(pwd)
print("Hashed Password")
print(hashed_pwd)