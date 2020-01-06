/**
 * 2013-12-10
 * 按照单词反转字符串
 * 现在有一个字符串，包含若干个单词，每个单词用若干个空格分开，现在要将字符串里的单词反转，且空格位置改变
 *
 * 原始字符串
 * var arr = "apple    orange banana   pear lemon peach mango";
 * 需要得到的字符串
 * var arr = "mango peach lemon pear   banana orange    apple";
 * 决定先循环一次将字符串反转，再循环一次将反转后的字符串里的每个单词反转
 */

var arr = "apple    orange banana   pear lemon peach mango";
document.write("<pre>"+arr+"</pre>");
arr = arrrev(arr);
arr = wordrev(arr);
function arrrev(array) {
    var len = array.length;
    var newarr = '';
    for (var i = len-1 ; i >= 0 ; i-- ) {
        newarr += array[i];
    }
    return newarr;
}
function wordrev($arr) {
    var len = arr.length;
    var newarr = '';
    var word = '';
    for (var i = 0 ; i < len ; i++) {
        if (arr[i] !== ' ') {
            word += arr[i];
        } else {
            word = arrrev(word);
            newarr += word;
            newarr +=' ';
            word = '';
        }
        if (i === len-1) { //for the last word
            word = arrrev(word);
            newarr += word;
        }
    }
    return newarr;
}
document.write("<pre>"+arr+"</pre>");
