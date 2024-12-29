import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useEffect, useState } from 'react';
import {getChannelsAPI,submitArticleAPI} from '@/apis/article'


  const { Option } = Select
  
  const Publish = () => {
    const [channels,setChannelList] = useState([])
    const [imageList, setImageList] = useState([])
    const [imageType, setImageType] = useState(0)

    const onTypeChange = (e) => {
      console.log(e)
      setImageType(e.target.value)
    }
    const onUploadChange = (info) => {
        console.log(info.fileList)
        setImageList(info.fileList)
    }
    useEffect(()=>{
        async function getChannelList(){
            const res = await getChannelsAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    },[])
    const onFinish = async (formValue) => {
        if (imageType !== imageList.length) 
            return message.warning('pic type and pic number not match')
        const { channel_id, content, title } = formValue
        const params = {
          channel_id,
          content,
          title,
          type: imageType,
          cover: {
            type: imageType,
            images: imageList.map(item => item.response.data.url)
          }
        }
        console.log(imageList)
        await submitArticleAPI(params)
        message.success('Submit Success!')
      }
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '发布文章' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input placeholder="Please input title" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="Channel"
              name="channel_id"
              rules={[{ required: true, message: 'Please select channel' }]}
            >
              <Select placeholder="Please select channel" style={{ width: 400 }}>
              {channels.map(item => (
                    <Option key={item.id} value={item.id}>
                    {item.name}
                    </Option>
              ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input contents' }]}
            >
            <ReactQuill
                    className="publish-quill"
                    theme="snow"
                    placeholder="Please input contents"
            />
            </Form.Item>


            <Form.Item label="Cover">
                <Form.Item name="type">
                    <Radio.Group onChange={onTypeChange}>
                    <Radio value={1}>1 pic</Radio>
                    <Radio value={3}>3 pic</Radio>
                    <Radio value={0}>No pic</Radio>
                    </Radio.Group>
                </Form.Item>
                {imageType > 0 &&<Upload
                    name="image"
                    listType="picture-card"
                    showUploadList
                    action={'http://geek.itheima.net/v1_0/upload'}
                    onChange={onUploadChange}
                    maxCount={imageType}
                >
                    <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                    </div>
                </Upload>}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit" >
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish