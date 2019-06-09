---
layout: post
title: "Project Omicron Week 2 Blog Draft"
---

With this dungeon game, I ran into a lot of problems with loading images and sprites in from a tilesheet. Once I figured out that, I created classes for the background, the walls, and the hero. I drew a small room and added a tilesprite for the background, then drew the animated idle hero in the center. I then wanted to move the character left and right with the A and D keys, but `setVelocityX` wasn't working. However, once the hero was enabled in the physics world, I was able to use `hero.body.setVelocityX`. I then coded so that when the player pressed the WASD keys, they would move the respective directions. However, I wanted the animations to be consistent with the movement, so I loaded in a running spritesheet and created four new animations, one for each direction. I then added a toggle to each of the WASD keys so that when you hold W, it doesn't start the running up animation over and over again. And then I used the toggle release of each WASD so that when you let go of each key, the hero becomes idle once more facing the direction it just ran in.

[Play the Dungeon Crawler Here](/omicron/dungeon_crawler/)