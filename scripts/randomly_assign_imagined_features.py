import os
import yaml
import hashlib

COMPETENCY_DIR = 'src/_data/competency'

def iseven(digit):
    return int(digit, 16) % 2 == 0


if __name__ == "__main__":
    competencies = [os.path.join(COMPETENCY_DIR, f)
                    for f in os.listdir('src/_data/competency')]
    for f in competencies:
      hash = hashlib.md5(f.encode()).hexdigest()
      with open(f, 'r', encoding="utf-8") as stream:
          data = yaml.load(stream, Loader=yaml.Loader) or {}
      if 'dependencies' not in data:
          data['dependencies'] = []

      iseven(hash[0]) and data['dependencies'].append('imagined_current')
      iseven(hash[2]) and data['dependencies'].append('imagined_future')
      iseven(hash[3]) and data['dependencies'].append('imagined_unlikely')

      # Make this unique
      data['dependencies'] = list(set(data['dependencies']))
      data['dependencies'].sort()

      with open(f, 'w', encoding="utf-8") as stream:
          stream.write(yaml.dump(data))

      
