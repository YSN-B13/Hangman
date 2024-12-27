import random

def choose_word():
    words = ["python", "hangman", "programming", "computer", "algorithm", "developer", "challenge"]
    return random.choice(words)

def display_hangman(tries):
    stages = [  # final state: head, torso, both arms, and both legs
                """
                   --------
                   |      |
                   |      O
                   |     \\|/
                   |      |
                   |     / \\
                   -
                """,
                # head, torso, both arms, and one leg
                """
                   --------
                   |      |
                   |      O
                   |     \\|/
                   |      |
                   |     / 
                   -
                """,
                # head, torso, and both arms
                """
                   --------
                   |      |
                   |      O
                   |     \\|/
                   |      |
                   |      
                   -
                """,
                # head, torso, and one arm
                """
                   --------
                   |      |
                   |      O
                   |     \\|
                   |      |
                   |     
                   -
                """,
                # head and torso
                """
                   --------
                   |      |
                   |      O
                   |      |
                   |      |
                   |     
                   -
                """,
                # head
                """
                   --------
                   |      |
                   |      O
                   |    
                   |      
                   |     
                   -
                """,
                # initial empty state
                """
                   --------
                   |      |
                   |      
                   |    
                   |      
                   |     
                   -
                """
    ]
    return stages[tries]

def hangman():
    word = choose_word()
    word_letters = set(word)  # letters in the word
    alphabet = set("abcdefghijklmnopqrstuvwxyz")
    used_letters = set()  # what the user has guessed
    tries = 6

    print("Welcome to Hangman!")
    
    while len(word_letters) > 0 and tries > 0:
        # letters used
        print("You have used these letters: ", ' '.join(used_letters))

        # current word
        word_list = [letter if letter in used_letters else '_' for letter in word]
        print("Current word: ", ' '.join(word_list))

        user_letter = input("Guess a letter: ").lower()

        if user_letter in alphabet - used_letters:
            used_letters.add(user_letter)
            if user_letter in word_letters:
                word_letters.remove(user_letter)
            else:
                tries -= 1
                print(f"Letter {user_letter} is not in the word.")
                print(display_hangman(tries))

        elif user_letter in used_letters:
            print("You have already used that letter. Guess another letter.")

        else:
            print("Invalid character. Please enter a letter.")

    if tries == 0:
        print(f"Sorry, you lost. The word was {word}.")
    else:
        print(f"Congratulations! You guessed the word {word}!")

if __name__ == "__main__":
    hangman()
