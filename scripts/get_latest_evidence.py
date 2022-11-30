import os
import pandas as pd

# This was created by publishing the Google Sheet to the web
EVIDENCE_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vSIasSkA9FCc0xb6ms4j-3EufNf_OR75-30Xip8CuxtVoifVgpUoY5Dt6uDUW9DBet8YfKhO0YWWhgT/pub?gid=0&single=true&output=csv"
EVIDENCE_CSV=os.path.join('src', '_data', 'evidence.csv')


if __name__ == "__main__":
    evidence = pd.read_csv(EVIDENCE_URL, parse_dates=['Session date'])
    evidence.to_csv(EVIDENCE_CSV, index=False)