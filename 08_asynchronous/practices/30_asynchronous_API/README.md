# PRACTICE - ASYNCHRONOUS API
## Objective: Using third part API in the Front-End
- Using the prior cumulated knowledge ( JS, class based component )
build a react app using a third part library and build/

Here few links: 
- Star Wars API 1: http://swapi.py4e.com/
- Star Wars API 2: https://swapi.dev/
- Numbers API: http://numbersapi.com/#42
- Chuck Norris:  https://api.chucknorris.io/
- Pokemon : https://pokeapi.co/
- International Space Station: http://open-notify.org/Open-Notify-API/ISS-Location-Now/

---------------------------------

# Personal implementation choice
- Using: Numbers API
- Consume the API with all endpoint possible
	- propose a UI/UX to request the API with the options customizable

------ PROBLEMATIC / LOGIC -------
- inputs fields: ( but the "random" checkbox ):
If an input fields is edited --> the other fields value should be reset
( ex: input math > put a number value, then input date: add a value
	- expect math: to have no value
)
*e.i: interfacingWithState*