# 2048 Game 🎮
A simple implementation of the classic **2048 puzzle game** built with HTML, CSS, and JavaScript.

<img width="1890" height="950" alt="image" src="https://github.com/user-attachments/assets/9ddba284-49ff-44ab-9ac5-70bef9f2080a" />

## 📖 Description
**2048 Game** is a single-player sliding tile puzzle. The goal is to combine tiles with the same number to reach the **2048 tile**.
Players use arrow keys to move tiles in four directions. Tiles merge when they collide, increasing the score.  

## 🚀 Getting Started
Play the game here: [Deployed 2048 Game](https://zma8.github.io/javascript-browser-game-project-2048/)  
Planning materials and design sketches can be found here: [Link to Planning Materials](2048.docx)

## 🎮 How to Play
- Use your **arrow keys** (↑, ↓, ←, →) to move the tiles.
- When two tiles with the same number touch, they **merge into one**.
- Your goal is to create the **2048 tile**.
- Use the **Undo** button to go back one step — but you only have **3 undos per game**.
- Try to beat your **best score** (saved in local storage).

## 🛠️ Technologies Used
- **HTML**  
- **CSS**  
- **JavaScript**  
- **Animate.css** for animations

## 🙏 Attributions
- [Animate.css](https://animate.style/) — used for tile animation effects

## ✨ Features
- 4x4 grid classic 2048 gameplay
- **Undo** functionality (max 3 per game)
- **Score tracking** and **Best score** saved in local storage
- **Win/Lose detection**
- **Dark mode toggle**
- Smooth animations for tile movements and merges

## 🔄 Undo Feature
The **Undo** button lets you revert to your **previous board state**.  
- Every time you make a move, the current board and score are saved into `prevBoard` and `prevScore`.  
- Pressing **Undo** restores these values.  
- You can only undo **up to 3 times per game**.  
- If no tiles moved during the last action, the Undo button stays disabled.

## 🎯 Next Steps / Stretch Goals
- Smooth tile sliding animations  
- Mobile-friendly interface with touch controls  
- Custom board sizes (e.g., 5x5, 6x6)  
- AI suggestions for optimal moves
