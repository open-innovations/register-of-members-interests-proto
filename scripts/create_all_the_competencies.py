import os
import pandas as pd
from pathlib import Path

EVIDENCE_CSV ='src/_data/evidence.csv'

if __name__ == "__main__":
    competencies = pd.read_csv(EVIDENCE_CSV, usecols=['ID'])
    for id in competencies.ID.values:
        file_path = os.path.join('src', '_data', 'competency', id + '.yml')
        Path(file_path).touch()
