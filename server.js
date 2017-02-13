const express  = require('express'),
      fs = require('fs'),
      bodyParser = require('body-parser')
const app = express()
app.use(express.static('www'))
app.use(bodyParser.json())
app.get('/api/card/:id',(req,res) => {
    var fileName = `${req.params.id}.txt`
    fs.readFile(fileName, (err, data) => {
        if(err){
            res.json({code: 'error', message: '数据不存在！'})
        }
        else{
            res.json({
                code: 'success',
                message: '成功！',
                data: JSON.parse(data)
            })
        }
    })
})
app.put('/api/card/:id', (req, res) => {
    console.log(req.body)
    fs.writeFile(`${req.params.id}.txt`, JSON.stringify(req.body), err => {
        if(err){
            console.error('保存文件错误', err)
            res.json({code: 'error', message: '保存文件错误'})
        }
        else{
            res.json({code: 'success', message: '成功！'})
        }
    })
})
app.listen(5000, err => console.log('正在运行ing...'))

// const 声明创建一个只读的常量