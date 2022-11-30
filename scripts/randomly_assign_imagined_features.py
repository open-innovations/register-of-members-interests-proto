import os
import yaml
import hashlib

COMPETENCY_DIR = 'src/_data/competency'

def random_shuffle(digit, threshold):
    return int(digit, 16) < threshold

def remove_items(list, values):
    for value in values:
        while value in list:
            list.remove(value)

if __name__ == "__main__":
    competencies = [os.path.join(COMPETENCY_DIR, f)
                    for f in os.listdir('src/_data/competency')]
    for f in competencies:
      hash = hashlib.md5(f.encode()).hexdigest()
      with open(f, 'r', encoding="utf-8") as stream:
          data = yaml.load(stream, Loader=yaml.Loader) or {}
      if 'dependencies' not in data:
          data['dependencies'] = []

      remove_items(data['dependencies'], ['imagined_current', 'imagined_future', 'imagined_unlikely'])
      print(data['dependencies'])
      random_shuffle(hash[0], 10) and data['dependencies'].append('imagined_current')
      random_shuffle(hash[2], 5) and data['dependencies'].append('imagined_future')
      random_shuffle(hash[3], 2) and data['dependencies'].append('imagined_unlikely')

      # Make this unique
      data['dependencies'] = list(set(data['dependencies']))
      data['dependencies'].sort()

      with open(f, 'w', encoding="utf-8") as stream:
          stream.write(yaml.dump(data))

      
