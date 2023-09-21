// ==UserScript==
// @name         luck
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://zj.122.gov.cn/veh1/netxh/main*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=122.gov.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 创建一个新的按钮
    var btnCalcLuck = document.createElement('button');
    btnCalcLuck.textContent = '计算凶吉';

    // 当按钮被点击时，计算并显示所有车牌的凶吉
    btnCalcLuck.addEventListener('click', function() {
        // 找到车牌列表
        var iframe = document.querySelector('iframe');
        if (iframe == null) {
            return;
        }
        var licensePlates = iframe.contentDocument.querySelectorAll('.codes .code span:nth-child(2)');
        if (licensePlates == null) {
            return;
        }

        // 遍历车牌
        licensePlates.forEach(function(plate) {
            // 计算车牌的凶吉
            plate.textContent = calculateLuck(plate.textContent);
        });
    });

    // 使用 MutationObserver 监控页面的变化
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var tabContent = document.getElementById('myTabContent');
            if(tabContent == null) {
                return;
            }
            // 如果 btnRand 出现并且 btnCalcLuck 还没有插入到页面中，则插入 btnCalcLuck
            if (tabContent && !btnCalcLuck.parentNode) {
                btnCalcLuck.className = "btn btn-large btn-primary";
                tabContent.parentNode.insertBefore(btnCalcLuck, tabContent.nextSibling);
            }
        });
    });

    // 开始监控页面的变化
    observer.observe(document.body, {childList: true, subtree: true});

    // 计算凶吉的函数
    // TODO: 替换为实际的计算凶吉的函数
    function calculateLuck(plate) {
        // 使用正则表达式提取第一串连续的字母和数字的组合
        var match = plate.match(/[0-9a-zA-Z]+/);
        if (!match || match[0].length < 5) {
            return plate + ' 无效';
        }

        var combination = match[0];

        // 提取数字部分
        var numbers = combination.match(/[0-9]+/g);
        if (!numbers) {
            return plate + ' 无效';
        }

        // 组成一位数然后对80取余
        var sum = 0;
        numbers.forEach(function(number) {
            for (var i = 0; i < number.length; i++) {
                sum = sum * 10 + parseInt(number[i]);
            }
        });
        var remainder = sum % 80;
        var luckList = [1,3,5,6,7,8,11,13,15,16,17,18,21,23,24,25,29,31,32,33,35,37,39,41,45,47,48,52,57,63,65,67,68,73,81];
        console.log(`计算 ${combination}: ${sum}, ${remainder}, ${remainder in luckList}`);
        if(remainder in luckList) {
            return combination + '吉'
        }
        return combination + '凶'; // 假设所有车牌都是吉
    }
})();
