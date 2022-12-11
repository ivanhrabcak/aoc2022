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
    | xs == [] && isCommonChar = priority
    | isCommonChar = priority
    | xs /= [] = getCommonItemPriority xs comp1
    | otherwise = 0
    where 
        isCommonChar = isInfixOf [x] comp1
        priority = charValue x

part1 (x:xs)
    | xs == [] = getCommonItemPriority comp1 comp2
    | otherwise = getCommonItemPriority comp1 comp2 + part1 xs
    where
        half = div (length x) 2 
        comp1 = take half x
        comp2 = drop half x

getCommonItemsTriplet (x:xs) r1 r2
    | xs == [] && isInBothStrings = priority
    | isInBothStrings = priority
    | xs /= [] = getCommonItemsTriplet xs r1 r2
    | otherwise = 0
    where 
        isInBothStrings = isInfixOf [x] r1 && isInfixOf [x] r2
        priority = charValue x

part2 :: [String] -> Int
part2 (x:xs)
    | next == [] = commonItems
    | otherwise =  commonItems + part2 next
    where
        r2 = head xs
        r3 = head (drop 1 xs)
        next = drop 2 xs

        commonItems = getCommonItemsTriplet x r2 r3