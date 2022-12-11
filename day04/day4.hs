import Data.List
import System.IO

main = do
    handle <- openFile "input.txt" ReadMode
    contents <- hGetContents handle
    let input = lines contents
    
    print (part1 input)
    print (part2 input)

splitBy delimiter = foldr f [[]] 
            where f c l@(x:xs) | c == delimiter = []:l
                               | otherwise = (c:x):xs


parseInput line = map (\x -> map (\y -> read y :: Integer) (splitBy '-' x)) (splitBy ',' line)

arePairsContained line
    | end2 <= end1 && start2 >= start1 = True
    | end1 <= end2 && start1 >= start2 = True
    | otherwise = False
    where
        start1 = head (head line)
        end1 = last (head line)
        start2 = head (last line)
        end2 = last (last line)

part1 (x:xs)
    | xs == [] = addedToSum
    | otherwise = addedToSum + part1 xs
    where
        pairs = parseInput x
        pairsOverlap = arePairsContained pairs
        addedToSum = if pairsOverlap then 1 else 0

doPairsOverlap line
    | max start1 start2 <= min end1 end2 = True
    | otherwise = False
    where
        start1 = head (head line)
        end1 = last (head line)
        start2 = head (last line)
        end2 = last (last line)

part2 (x:xs)
    | xs == [] = addedToSum
    | otherwise = addedToSum + part2 xs
    where
        pairs = parseInput x
        pairsOverlap = doPairsOverlap pairs
        addedToSum = if pairsOverlap then 1 else 0