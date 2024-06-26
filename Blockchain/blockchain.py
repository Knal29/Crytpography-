import hashlib
import time
import json
import os
import random

class Blockchain:
    def __init__(self, filename):
        self.filename = filename
        self.chain = []
        self.pending_transactions = []
        self.mining_reward = 100
        self.difficulty = 2  
        if os.path.exists(self.filename):
            self.load_chain()
        else:
            self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = {
            'index': 0,
            'previous_hash': "0",
            'timestamp': int(time.time()),
            'transactions': [],
            'hash': self.calculate_hash("genesis"),
            'nonce': 0
        }

        self.chain.append(genesis_block)
        self.save_chain()
        print("Genesis block created")

    def add_transaction(self):
        transaction = input("Enter a transaction: ")
        self.pending_transactions.append(transaction)
        print("Transaction added to pending transactions")

    def mine_block(self):
        if not self.pending_transactions:
            print("No pending transactions to mine")
            return
        nonce = random.randint(0, 1000000)  
        while True:
            new_block = {
                'index': len(self.chain),
                'previous_hash': self.chain[-1]['hash'],
                'timestamp': int(time.time()),
                'transactions': self.pending_transactions,
                'hash': self.calculate_hash(str(self.pending_transactions) + str(self.chain[-1]['hash']) + str(nonce)),
                'nonce': nonce
            }
            if self.validate_proof(new_block):
                break
            nonce += 1  

        self.chain.append(new_block)
        self.save_chain()
        self.pending_transactions = []
        print("Block added to the blockchain")

    def calculate_hash(self, data):
        sha256_hash = hashlib.sha256()
        sha256_hash.update(data.encode('utf-8'))
        return sha256_hash.hexdigest()

    def validate_proof(self, block):
       
        return block['hash'][:self.difficulty] == '0' * self.difficulty

    def save_chain(self):
        with open(self.filename, 'w') as f:
            json.dump(self.chain, f)

    def load_chain(self):
        with open(self.filename, 'r') as f:
            self.chain = json.load(f)

    def verify_chain(self): #verifying if the blcokchain is corrupted or not
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            if current_block['previous_hash'] != previous_block['hash']:
                print(f"Blockchain corrupted at block {current_block['index']}")
                return False
            if not self.validate_proof(current_block):
                print(f"Invalid proof of work at block {current_block['index']}")
                return False
        print("Blockchain is valid")
        return True

blockchain = Blockchain('blockchain.json')

while True:
    print("1. Add transaction")
    print("2. Mine block")
    print("3. Verify blockchain")
    print("4. Exit")
    choice = input("Choose an option: ")
    if choice == "1":
        blockchain.add_transaction()
    elif choice == "2":
        blockchain.mine_block()
    elif choice == "3":
        blockchain.verify_chain()
    elif choice == "4":
        break
    else:
        print("Invalid option")
