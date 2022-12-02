import Data.List
import System.IO 

main = do 
    handle <- openFile "input.txt" ReadMode
    contents <- hGetContents handle
    let input = lines contents
    
    let output = part2 input

    print output

pointsFor move 
    | move == "A" = 1
    | move == "B" = 2
    | move == "C" = 3
    | otherwise = error "bad input"

-- [winning move, losing move, draw]
getDecidingMoves opponentMove
    | opponentMove == "A" = ["B", "C", "A"]
    | opponentMove == "B" = ["C", "A", "B"]
    | opponentMove == "C" = ["A", "B", "C"]

translate outcome opponentMove
    | outcome == "X" = (getDecidingMoves opponentMove) !! 1
    | outcome == "Y" = (getDecidingMoves opponentMove) !! 2
    | outcome == "Z" = (getDecidingMoves opponentMove) !! 0
    | otherwise = error "bad input"

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
        myMove = translate ((words x) !! 1) opponentMove

part2 (x:xs) 
    | xs == [] = evaluate x
    | otherwise = evaluate x + part2 xs