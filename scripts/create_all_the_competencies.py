import os
import pandas as pd
import yaml
from pathlib import Path

EVIDENCE_CSV ='src/_data/evidence.csv'

if __name__ == "__main__":
    competencies = pd.read_csv(EVIDENCE_CSV, usecols=['ID', 'Competency', 'Duplicates'], na_values=[''])

    for index, competency in competencies.iterrows():
        file_path = os.path.join('src', '_data', 'competency', competency.ID + '.yml')

        try:
            with open(file_path, 'r', encoding="utf-8") as stream:
                data = yaml.load(stream, Loader=yaml.Loader) or {}
        except FileNotFoundError:
            data = {}

        data['competency'] = competency.Competency

        with open(file_path, 'w', encoding="utf-8") as stream:
            stream.write(yaml.dump(data))
