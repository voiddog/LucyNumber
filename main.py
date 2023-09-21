import re

def calculate_xj(number: str):
    j = [0,1,3,5,6,7,11,13,15,16,21,23,24,29,31,32,33,35,37,45,47,48,52,57,61,63,65,67,68,81]
    p = [8,17,18,25,30,36,38,39,49,50,51,55,58,71,72,73,77]
    x = [2,4,9,10,12,14,19,20,22,26,27,28,34,40,41,42,43,44,46,53,54,56,59,60,62,64,66,69,70,74,75,76,78,79,80]
    number_str = ""
    for ch in number:
        if ch >= '0' and ch <= '9':
            number_str += ch
    value = int(number_str)
    value = value / 80 - int(value / 80)
    value = int(value * 80)
    if value in j:
        print("{} 为 吉".format(number))
    elif value in p:
        print("{} 为 平".format(number))
    elif value in x:
        print("{} 为 凶".format(number))
    else:
        print("{} 为 null({})".format(number, value))

def collect_number(doc: str):
    pattern = re.compile(r'<span class="num">(.*)</span>')
    results = pattern.findall(doc)
    for ret in results:
        calculate_xj(ret)


input_array = [
    "A02282",
"A63135",
"A32366",
"A36881",
"A37525",
"A65723",
"A06297",
"A06122",
"A82859",
"A83721",
]

f = open('input.xml', 'r')
collect_number(f.read())
