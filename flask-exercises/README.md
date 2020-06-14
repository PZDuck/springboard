# flask-exercises-combined
### Contains:
* **Flask greet-calc exercise**
  - Introductory exercise that covers basic routing
  
 * **Flask madlib exercise**
    
    
    Simplified version of Madlib story generator. Currently contains:
      - Basic routing
      - Plain HTML pages (no styling so far)
      - Local SQLite3 database which stores separate parts of the stories
    
    
    This small app takes inputs from the user and "generates" (randomly picks each of the three parts of the story from the database)
    a story with all the inputs. 
    
    
    A story follows the format: ```OPENING LINE {place}, FOLLOWING LINE {adjective} {noun}. ENDING LINE {verb} {plural_noun}```
    
    
    
    E.g.: 
    ```
    place = 'condo'
    adjective = 'frozen'
    noun = 'dragon'
    verb = 'eat'
    plural_noun = 'popcicles'`
          
          
    Result: Once upon a time in a long-ago condo, there lived a large frozen dragon. It loved to eat popcicles.```
