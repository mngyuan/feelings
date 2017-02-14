import json
import re

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

if __name__ == '__main__':
    main()
