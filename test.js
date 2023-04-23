const fs = require('fs');
const glob = require('glob')

const inputFilePath = './input.txt'; // 输入文件路径
const outputFilePath = 'output.txt'; // 输出文件路径
const outputFile = 'result.txt'
const searchDir = './src'

const keys = []; // 存储键的数组
// 读取输入文件
fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading input file: ${err}`);
      return;
    }
  
    // 正则表达式匹配键
    const regex = /([^\s:]+)(?=:)/g;
    let match;
    while (match = regex.exec(data)) {
      const [, key] = match;
      keys.push(key);
    }
    
    // 将键写入输出文件
    const outputString = keys.join('\n');
    fs.writeFile(outputFilePath, outputString, (err) => {
      if (err) {
        console.error(`Error writing to output file: ${err}`);
      }
    });

    // 正则表达式匹配文件名中是否包含键字符串
    const filePattern = key => new RegExp(`.*${key}.*`, 'i')

    // 查找包含键字符串的文件并输出到文件中
    fs.writeFileSync(outputFile, '')
    keys.forEach(key => {
      const keyFilePattern = filePattern(key)
      const found = glob.sync(`${searchDir}/*.*`).filter(file => fs.readFileSync(file, 'utf8').match(keyFilePattern))
      if (found.length) {
        fs.appendFileSync(outputFile, `Found files containing the keys: ${key}\n${found.join(' ')}\n\n`)
      } else {
        fs.appendFileSync(outputFile, `Keys: ${key} not found\n\n`)
      }
    })

    // 将查找到的文件路径和未找到的键写入文件
    // fs.writeFileSync(outputFile, '')
    // if (foundFiles.length) {
    //   fs.appendFileSync(outputFile, `Found files containing the keys:\n\n${foundFiles.join('\n')}\n\n`)
    // } else {
    //   fs.appendFileSync(outputFile, 'No files containing the keys were found.\n\n')
    // }
    // if (notFoundKeys.length) {
    //   fs.appendFileSync(outputFile, `Keys not found:\n\n${notFoundKeys.join('\n')}\n\n`)
    // } else {
    //   fs.appendFileSync(outputFile, 'All keys were found.\n\n')
    // }
    console.log('Done.')
  });
