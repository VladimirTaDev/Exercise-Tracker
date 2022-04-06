# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

My freeCodeCamp.org - Back End Development and APIs Final Project.

# [Run on replit](https://replit.com/@VladimirTa/)

# Example Usage:
Create a New User:
POST /api/users/  
> username  

Add exercises
POST /api/users/:_id/exercises/  
> :_id  
> description  
> duration (mins.)  
> date (yyyy-mm-dd)  

GET user's exercise log:  
> GET /api/users/:_id/logs?[from][&to][&limit]  
> [ ] = optional  
> from, to = dates (yyyy-mm-dd); limit = number

[By Vladimir Tarassenko](https://www.freecodecamp.org/vladimir_ta/)

[By freeCodeCamp.org](https://www.freecodecamp.org/)