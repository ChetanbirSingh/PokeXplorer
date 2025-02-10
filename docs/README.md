# Pokémon Search Application

## Project Description
This project simulates a Pokémon search application where users can search for Pokémon by name or ID and view detailed information such as types, stats, height, weight, base experience, and evolution chains. The app fetches data from the PokéAPI and dynamically displays the information with interactive features like type-based background gradients and a hover effect on the Pokémon images.

## Scope and Functionality
The Pokémon Search application includes the following core functionality:

- **Search Pokémon**: Users can input a Pokémon name or ID, and it will fetch and display relevant data.
- **Display Pokémon Information**:
  - Name, type(s), height, weight, and base experience.
  - Stats such as HP, Attack, Defense, and others.
  - Front and back images of the Pokémon with hover functionality.
- **Evolution Chain**: Users can see the evolution chain of the searched Pokémon, with images and names of evolved forms.
- **Background Gradient**: The background color of the Pokémon card is dynamically generated based on the Pokémon's types.
- **Error Handling**: If the Pokémon does not exist or the input is invalid, an error message is shown.

## Motivation
This project was created to practice advanced JavaScript concepts, API integration, and DOM manipulation. The goal was to build an interactive Pokémon search app that showcases real-time data retrieval and user interaction features.

## Screenshot
### Pokémon Info Screen
![Squirtle info](https://github.com/user-attachments/assets/22bde3bd-b83c-4d0d-bcce-1a866c43d080)
![latias info](https://github.com/user-attachments/assets/c53feeb8-c5e2-4a40-9a8f-06b16474fee2)

### Evolution Chain
![Squirtle Evolution Chain](https://github.com/user-attachments/assets/e8f11321-8c7d-4279-ba4b-8ca698e67b2f)

## Table of Contents
- [Project Description](#project-description)
- [Scope and Functionality](#scope-and-functionality)
- [Motivation](#motivation)
- [Technology Stack](#technology-stack)
- [Future Implementations/Improvements](#future-implementationsimprovements)
- [Known Bugs](#known-bugs)
- [Installation and Setup](#installation-and-setup)
- [Credits and Acknowledgments](#credits-and-acknowledgments)

## Technology Stack
- **HTML**
- **CSS**
- **JavaScript**

## Future Implementations/Improvements
- Implement **local storage** to save the last searched Pokémon and restore it on page reload.
- Add more **customization options**, such as displaying multiple Pokémon at once or including additional Pokémon-related data.

## Known Bugs
- No known bugs at the moment.

## Installation and Setup
### Step-by-Step Instructions
1. Clone the repository.
2. Open the `index.html` file in a browser.

## Credits and Acknowledgments
- This app uses [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.
