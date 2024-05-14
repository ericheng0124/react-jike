import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select, message
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {useEffect, useState} from "react"
import {getChannelAPI, createArticleAPI} from "@/apis/article"

const {Option} = Select

const Publish = () => {
  // 获取频道列表
  const [channelList, setChannelList] = useState([])
  // 封面图片模式
  const [imageType, setImageType] = useState(0)

  useEffect(() => {
    // 1. 封装函数,函数体内调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    // 2. 调用函数获取选择列表
    getChannelList()
  }, [])

  // 提交表单数据
  const onFinish = (formValue) => {
    console.log(formValue)
    // 校验封面类型imageType是否和实际图片列表imageList数量一致
    if(imageList.length !== imageType) return message.warning('封面类型和图片数量不匹配')
    const {title, content, channel_id} = formValue
    // 1. 按照接口文档格式处理表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,  // 当前的封面模式
        images: imageList.map(item=>item.response.data.url)  // 图片列表
      },
      channel_id
    }
    // 2. 调用接口提交表单数据
    createArticleAPI(reqData)
  }

  // 切换图片封面类型
  const onTypeChange = (e) => {
    // console.log(e.target.value)
    setImageType(e.target.value)
  }

  // 上传图片的回调方法
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log('正在上传中', value)
    setImageList(value.fileList)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            {title: <Link to={'/'}>首页</Link>},
            {title: '发布文章'},
          ]}
          />
        }
      >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 12}}
          initialValues={{type: 0}}  // 控制整个表单区域的默认初始值
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{required: true, message: '请输入文章标题'}]}
          >
            <Input placeholder="请输入文章标题" style={{width: 400}}/>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{required: true, message: '请选择文章频道'}]}
          >
            <Select placeholder="请选择文章频道" style={{width: 400}}>
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                {/*
                  listType:决定选择框的样式
                  showUploadList:控制显示上传列表
                */}
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name='image'
                onChange={onChange}
                maxCount={imageType}
              >
                <div style={{marginTop: 8}}>
                  <PlusOutlined/>
                </div>
              </Upload>
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{required: true, message: '请输入文章内容'}]}
          >
            {/*富文本编辑器*/}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{offset: 4}}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish