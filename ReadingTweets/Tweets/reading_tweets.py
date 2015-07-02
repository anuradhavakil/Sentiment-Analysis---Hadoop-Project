import sys
import os
import json
import pandas as pd
import matplotlib.pyplot as plt
import re
import json
import jsonschema
from Cython.Compiler.Naming import cfilenm_cname
from datetime import datetime
from pprint import pprint

pd.set_option('display.max_rows', 50000)
pd.set_option('display.max_colwidth', 500000)
pd.set_option('display.width', 1000)
pd.set_option('display.expand_frame_repr', True)



"""
file = "C:/output.json"

a =[]
search_for =["text"]

with open(file) as f:
    f=f.readlines()
 
for line in f:
    for tweet in search_for:
        if tweet in line:
            a.append(line)
            break
        
print a

"""
"""   
f = open("c:/output.json")
for line in f:
    print line,
f.close()
"""
tweets_data_path = 'c:/tmp/xd/output/target.out'

tweets_data = []
tweets_file = open(tweets_data_path, "r")
for line in tweets_file:
    try:
        tweet = json.loads(line)        
        tweets_data.append(tweet)
    except:
        continue
    
data = [{'No of tweets': len(tweets_data)},]
outfile = open('target_no_tweets.json', 'a')
json.dump(data, outfile,indent=4)

tweets = pd.DataFrame()


tweets['text'] = map(lambda tweet: tweet['text'], tweets_data,)


def word_in_text(word, text):
    word = word.lower()
    text = text.lower()
    match = re.search(word, text)
    if match:
        return True
    return False

"""tweets['Boston'] = tweets['text'].apply(lambda tweet: word_in_text('boston', tweet))"""

print tweets

myTweets = tweets

with open('myTextFile.txt', 'w') as myFile:
    myFile.write(str(myTweets))


create = pd.DataFrame()
create['created_at'] = map(lambda tweet: tweet['created_at'], tweets_data,)


for c in create.get('created_at', None) :
    cr = {'created_at': c}
    with open('created_by_target.json','a') as cfile:
        json.dump(cr,cfile)
    


