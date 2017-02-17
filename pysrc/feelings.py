from __future__ import print_function
import json
import re
import random

def add(d, k1, k2):
    if k1 not in d:
        d[k1] = {}
    if k2 not in d[k1]:
        d[k1][k2] = 0

    d[k1][k2] += 1
    return d[k1][k2]

# match words, including if they contain '
# and match punctuation, including new lines, as its own match.
match_regex = r"[\w']+|[.,!?;\-\n]"

counts = {}
prob = {}
output = {}
def main():
    f = open('input.txt')
    raw_text = f.read()
    last_word = '\0'
    for word in re.findall(match_regex, raw_text):
        word = word.lower()
        add(counts, last_word, word)
        last_word = word

    for word, transitions in counts.iteritems():
        prob[word] = {}
        total = 0.0
        for next_word, count in transitions.iteritems():
            total += count
        for next_word, count in transitions.iteritems():
            prob[word][next_word] = count / total

    for k1 in counts:
        output[k1] = {}
        for k2 in counts[k1]:
            output[k1][k2] = {'count': counts[k1][k2], 'p': prob[k1][k2]}

    with open('output.json', 'w') as outputf:
        json.dump(output, outputf, \
            sort_keys=True, indent=2, separators=(',', ': '))

    cur_word = raw_input()
    print()
    while True:
        cur_word = pick_next_word(cur_word)
        print(cur_word, end=' ')
        if cur_word == '\n':
            raw_input()

def pick_next_word(cur_word):
    cur_random = random.random()
    for option, p in prob[cur_word].iteritems():
        cur_random -= p
        if cur_random < 0:
            return option

if __name__ == '__main__':
    main()
