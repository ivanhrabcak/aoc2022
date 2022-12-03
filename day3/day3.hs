import Data.Char
import Data.List
import System.IO

main = do
    handle <- openFile "input.txt" ReadMode
    contents <- hGetContents handle
    let input = lines contents

    print (part1 input)
    print(part2 input)

charValue c = ord c - ord x + remainder
    where 
        x = if isUpper c then 'A' else 'a'
        remainder = if isUpper c then 27 else 1

getCommonItemPriority :: String -> String -> Int
getCommonItemPriority (x:xs) comp1
    | xs == [] = if isInfixOf [x] comp1 then charValue x else 0
    | otherwise = if isInfixOf [x] comp1 then charValue x else getCommonItemPriority xs comp1

part1 (x:xs)
    | xs == [] = getCommonItemPriority comp1 comp2
    | otherwise = getCommonItemPriority comp1 comp2 + part1 xs
    where
        half = div (length x) 2 
        comp1 = take half x
        comp2 = drop half x

getCommonItemsTriplet (x:xs) r1 r2
    | xs == [] = if isInfixOf [x] r1 && isInfixOf [x] r2 then charValue x else 0
    | otherwise = if isInfixOf [x] r1 && isInfixOf [x] r2 then charValue x else getCommonItemsTriplet xs r1 r2

part2 :: [String] -> Int
part2 (x:xs)
    | next == [] = getCommonItemsTriplet x r2 r3
    | otherwise =  getCommonItemsTriplet x r2 r3 + part2 next
    where
        r2 = head xs
        r3 = head (drop 1 xs)
        next = drop 2 xs