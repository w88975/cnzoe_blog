// ==UserScript==
// @name         URL替换脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  替换网页中所有指定的URL为新的URL
// @author       You
// @match        https://sexyjpg.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    // 定义要替换的旧URL数组和新URL
    const oldUrls = [
        'https://lt.btc35000.com/attachments/',
        'https://t0305.9p47q.com/attachments',
        'https://luntan.killcovid2021.com/attachments/',
        'https://p.workgreat18.live/attachments/',
        'https://pic.wonderfulday22.live/attachments/',
        'https://p.workarea7.live/attachments/',
        'https://pic.workgreat14.live/attachments/',
        'https://p.workgreat12.live/attachments/'
    ]
    const newUrl = 'https://int.alimamacloud1.com/attachments/'

    // 替换所有包含 /attachments/ 的URL
    function replaceInDocument(newValue) {
        const elements = document.querySelectorAll('*')

        elements.forEach((element) => {
            // 遍历所有子节点
            element.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    let text = node.nodeValue
                    if (text.includes('/attachments/')) {
                        // 正则替换 http/https 中的 /attachments/ 部分
                        text = text.replace(/https?:\/\/[^\/]+\/attachments\//g, newValue)
                        node.nodeValue = text
                    }
                }
            })

            // 替换 href 和 src 属性中的链接
            Array.from(element.attributes).forEach(attr => {
                if (attr.value.includes('/attachments/')) {
                    attr.value = attr.value.replace(/https?:\/\/[^\/]+\/attachments\//g, newValue)
                }
            })
        })
    }

    // 获取所有以 newUrl 开头的链接，并打印它们
    function printNewUrlLinks(newValue) {
        const links = []

        // 查找所有带 href 和 src 属性的元素
        document.querySelectorAll('a[href^="' + newValue + '"], img[src^="' + newValue + '"], video[src^="' + newValue + '"], audio[src^="' + newValue + '"]').forEach(element => {
            // 提取链接
            if (element.tagName === 'A') {
                links.push(element.href) // <a> 标签的 href
            } else if (element.tagName === 'IMG' || element.tagName === 'VIDEO' || element.tagName === 'AUDIO') {
                links.push(element.src) // <img>, <video>, <audio> 的 src
            }
        })

        // 打印链接，以 'link1, link2, ...' 的形式
        if (links.length > 0) {
            console.log('links: ', links.join(','))
        } else {
            console.log("No matching links found.")
        }
    }

    // 调用替换函数
    replaceInDocument(newUrl)

    // 调用打印函数
    printNewUrlLinks(newUrl)

    // 1. 提取 author_name
    const authorElement = document.querySelector('a[href*="author="]')
    let author_name = null
    if (authorElement) {
        const urlParams = new URLSearchParams(authorElement.href.split('?')[1])
        author_name = urlParams.get('author')
    }

    // 2. 提取 post_time
    const postTimeElement = document.querySelector('a[href*="date="]')
    let post_time = null
    if (postTimeElement) {
        const urlParams = new URLSearchParams(postTimeElement.href.split('?')[1])
        post_time = urlParams.get('date')
    }

    // 3. 获取 content 的 innerHTML
    const contentElement = document.querySelector('body > div.container-fluid > div > div.col-12.col-lg-10 > div > div.row.mt-2.col')
    let content = null
    if (contentElement) {
        content = contentElement.innerHTML.replace(/'/g, "''") // Escape single quotes for SQL
    }

    // 4. 提取所有图片链接
    const links = []
    document.querySelectorAll('img[src]').forEach(img => {
        if (img.src.startsWith(newUrl)) {
            links.push(img.src)
        }
    })
    const origin_imgs = links.join(',')

    //tid
    function getTidFromUrl(url) {
        const parsedUrl = new URL(url)
        const pathParts = parsedUrl.pathname.split('/')
        return pathParts[pathParts.length - 1]  // 获取路径中的最后一部分
    }

    // 示例使用
    const url = location.href
    const tid = getTidFromUrl(url)

    const title = document.querySelector('body > div.container-fluid > div > div.col-12.col-lg-10 > div > div.row.my-2.dflex.justify-content-between > h3').innerText

    // 5. 生成 SQLite 的 INSERT 语句
    let sql = `
        INSERT INTO PORN91 (title,tid,author_name, post_time, content, origin_imgs,author_uid,saved_imgs,is_hot)
        VALUES ('${title}','${tid}_sexyjpg', '${author_name}', '${post_time}', '${content}', '${origin_imgs}','','',0);
    `

    // 打印 SQL 语句
    //console.log('sql:', sql.trim());
    console.log({
        tid: tid,
        sql: sql.trim()
    })
    fetch('http://localhost:8080/api//91porn/insert-sexyjpg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tid: tid + '_sexyjpg',
            sql: sql.trim()
        })
    }).then(async res => {

        const rjson = await res.json()
        if (rjson.success) {
            window.close()
        } else {
            alert('失败')
        }
        console.log('res:', rjson)
    })
})()
