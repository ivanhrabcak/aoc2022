import Data.List
import System.IO 

main = do 
    handle <- openFile "input.txt" ReadMode
    contents <- hGetContents handle
    let input = lines contents

    let output = part1 input

    print output

pointsFor move 
    | move == "A" = 1
    | move == "B" = 2
    | move == "C" = 3

translate move
    | move == "X" = "A"
    | move == "Y" = "B"
    | move == "Z" = "C"
    
wins x y 
    | x == "A" && y == "B" = y
    | x == "B" && y == "C" = y
    | x == "C" && y == "A" = y
    | otherwise = x

evaluate x 
    | opponentMove == myMove = pointsFor myMove + 3
    | wins myMove opponentMove == myMove = pointsFor myMove + 6
    | otherwise = pointsFor myMove
    where 
        opponentMove = ((words x) !! 0)
        myMove = translate ((words x) !! 1)

part1 (x:xs) 
    | xs == [] = evaluate x
    | otherwise = evaluate x + part1 xs